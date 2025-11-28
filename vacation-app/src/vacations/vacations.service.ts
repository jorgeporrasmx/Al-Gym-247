import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import {
  VacationRequest,
  EstadoSolicitud,
  TipoLicencia,
} from './entities/vacation-request.entity';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { EmployeesService } from '../employees/employees.service';
import { CalendarService } from '../calendar/calendar.service';
import { MondayService } from '../monday/monday.service';
import { EmailService } from '../email/email.service';
import { LICENSE_RULES } from '../calendar/data/mexico-holidays';

@Injectable()
export class VacationsService {
  constructor(
    @InjectRepository(VacationRequest)
    private vacationRepository: Repository<VacationRequest>,
    private employeesService: EmployeesService,
    private calendarService: CalendarService,
    @Inject(forwardRef(() => MondayService))
    private mondayService: MondayService,
    @Inject(forwardRef(() => EmailService))
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  /**
   * Crear una nueva solicitud de vacaciones
   */
  async create(
    employeeId: string,
    createDto: CreateVacationDto,
  ): Promise<VacationRequest> {
    const employee = await this.employeesService.findOne(employeeId);

    const fechaInicio = new Date(createDto.fechaInicio);
    const fechaFin = new Date(createDto.fechaFin);

    // Validar fechas
    if (fechaFin < fechaInicio) {
      throw new BadRequestException(
        'La fecha de fin debe ser posterior a la fecha de inicio',
      );
    }

    // Validar anticipación mínima
    const minAdvanceDays = this.configService.get<number>(
      'MIN_ADVANCE_DAYS',
      15,
    );
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil(
      (fechaInicio.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < minAdvanceDays) {
      throw new BadRequestException(
        `Las solicitudes deben hacerse con al menos ${minAdvanceDays} días de anticipación`,
      );
    }

    // Calcular días hábiles
    const diasSolicitados = await this.calendarService.calculateWorkingDays(
      fechaInicio,
      fechaFin,
    );

    // Validar según tipo de licencia
    if (createDto.tipoLicencia === TipoLicencia.VACACIONES) {
      const balance = await this.employeesService.getBalance(employeeId);
      if (diasSolicitados > balance.diasDisponibles) {
        throw new BadRequestException(
          `No tienes suficientes días disponibles. Tienes ${balance.diasDisponibles} días y solicitas ${diasSolicitados}`,
        );
      }
    }

    // Generar token para aprobación
    const tokenAprobacion = uuidv4();

    // Crear la solicitud
    const solicitud = this.vacationRepository.create({
      employeeId,
      fechaInicio,
      fechaFin,
      diasSolicitados,
      tipoLicencia: createDto.tipoLicencia || TipoLicencia.VACACIONES,
      motivo: createDto.motivo,
      estado: EstadoSolicitud.PENDIENTE,
      tokenAprobacion,
    });

    await this.vacationRepository.save(solicitud);

    // Crear item en Monday.com
    try {
      const mondayItemId = await this.mondayService.createVacationRequest(
        solicitud,
        employee,
      );
      solicitud.mondayItemId = mondayItemId;
      await this.vacationRepository.save(solicitud);
    } catch (error) {
      console.error('Error al crear item en Monday:', error);
      // Continuar aunque falle Monday
    }

    // Enviar correo a RH
    try {
      await this.emailService.sendNewRequestNotification(solicitud, employee);
    } catch (error) {
      console.error('Error al enviar correo:', error);
      // Continuar aunque falle el correo
    }

    return solicitud;
  }

  /**
   * Obtener todas las solicitudes de un empleado
   */
  async findByEmployee(employeeId: string): Promise<VacationRequest[]> {
    return this.vacationRepository.find({
      where: { employeeId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Obtener todas las solicitudes pendientes (para RH)
   */
  async findPending(): Promise<VacationRequest[]> {
    return this.vacationRepository.find({
      where: { estado: EstadoSolicitud.PENDIENTE },
      relations: ['employee'],
      order: { createdAt: 'ASC' },
    });
  }

  /**
   * Obtener una solicitud por ID
   */
  async findOne(id: string): Promise<VacationRequest> {
    const solicitud = await this.vacationRepository.findOne({
      where: { id },
      relations: ['employee'],
    });

    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }

    return solicitud;
  }

  /**
   * Obtener solicitud por token de aprobación
   */
  async findByToken(token: string): Promise<VacationRequest> {
    const solicitud = await this.vacationRepository.findOne({
      where: { tokenAprobacion: token },
      relations: ['employee'],
    });

    if (!solicitud) {
      throw new NotFoundException('Token de aprobación inválido');
    }

    return solicitud;
  }

  /**
   * Aprobar una solicitud
   */
  async approve(
    id: string,
    aprobadoPor: string,
    comentarios?: string,
  ): Promise<VacationRequest> {
    const solicitud = await this.findOne(id);

    if (solicitud.estado !== EstadoSolicitud.PENDIENTE) {
      throw new BadRequestException('Solo se pueden aprobar solicitudes pendientes');
    }

    solicitud.estado = EstadoSolicitud.APROBADA;
    solicitud.aprobadoPor = aprobadoPor;
    solicitud.fechaAprobacion = new Date();
    if (comentarios) solicitud.comentariosRh = comentarios;

    await this.vacationRepository.save(solicitud);

    // Actualizar saldo del empleado si son vacaciones
    if (solicitud.tipoLicencia === TipoLicencia.VACACIONES) {
      await this.employeesService.updateVacationBalance(
        solicitud.employeeId,
        Number(solicitud.diasSolicitados),
      );
    }

    // Actualizar estado en Monday
    try {
      await this.mondayService.updateVacationStatus(
        solicitud.mondayItemId,
        'Aprobada',
      );
    } catch (error) {
      console.error('Error al actualizar Monday:', error);
    }

    // Notificar al empleado
    try {
      await this.emailService.sendApprovalNotification(solicitud, true);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }

    return solicitud;
  }

  /**
   * Rechazar una solicitud
   */
  async reject(
    id: string,
    aprobadoPor: string,
    comentarios?: string,
  ): Promise<VacationRequest> {
    const solicitud = await this.findOne(id);

    if (solicitud.estado !== EstadoSolicitud.PENDIENTE) {
      throw new BadRequestException('Solo se pueden rechazar solicitudes pendientes');
    }

    solicitud.estado = EstadoSolicitud.RECHAZADA;
    solicitud.aprobadoPor = aprobadoPor;
    solicitud.fechaAprobacion = new Date();
    if (comentarios) solicitud.comentariosRh = comentarios;

    await this.vacationRepository.save(solicitud);

    // Actualizar estado en Monday
    try {
      await this.mondayService.updateVacationStatus(
        solicitud.mondayItemId,
        'Rechazada',
      );
    } catch (error) {
      console.error('Error al actualizar Monday:', error);
    }

    // Notificar al empleado
    try {
      await this.emailService.sendApprovalNotification(solicitud, false);
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }

    return solicitud;
  }

  /**
   * Cancelar una solicitud (solo si está pendiente)
   */
  async cancel(id: string, employeeId: string): Promise<VacationRequest> {
    const solicitud = await this.findOne(id);

    if (solicitud.employeeId !== employeeId) {
      throw new BadRequestException('Solo puedes cancelar tus propias solicitudes');
    }

    if (solicitud.estado !== EstadoSolicitud.PENDIENTE) {
      throw new BadRequestException('Solo se pueden cancelar solicitudes pendientes');
    }

    solicitud.estado = EstadoSolicitud.CANCELADA;
    await this.vacationRepository.save(solicitud);

    // Actualizar estado en Monday
    try {
      await this.mondayService.updateVacationStatus(
        solicitud.mondayItemId,
        'Cancelada',
      );
    } catch (error) {
      console.error('Error al actualizar Monday:', error);
    }

    return solicitud;
  }

  /**
   * Obtener reglas de licencia
   */
  getLicenseRules() {
    return LICENSE_RULES;
  }
}
