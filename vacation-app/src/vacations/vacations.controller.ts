import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VacationsService } from './vacations.service';
import { CreateVacationDto } from './dto/create-vacation.dto';
import { ApproveVacationDto } from './dto/approve-vacation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('vacations')
@Controller('vacations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VacationsController {
  constructor(private readonly vacationsService: VacationsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear solicitud de vacaciones/licencia' })
  @ApiResponse({ status: 201, description: 'Solicitud creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o sin días disponibles' })
  create(@Request() req: any, @Body() createDto: CreateVacationDto) {
    return this.vacationsService.create(req.user.id, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener mis solicitudes' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes' })
  findMine(@Request() req: any) {
    return this.vacationsService.findByEmployee(req.user.id);
  }

  @Get('pending')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Obtener solicitudes pendientes (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de solicitudes pendientes' })
  findPending() {
    return this.vacationsService.findPending();
  }

  @Get('rules')
  @ApiOperation({ summary: 'Obtener reglas de licencias según LFT' })
  @ApiResponse({ status: 200, description: 'Reglas de licencias' })
  getLicenseRules() {
    return this.vacationsService.getLicenseRules();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener solicitud por ID' })
  @ApiResponse({ status: 200, description: 'Detalle de solicitud' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  findOne(@Param('id') id: string) {
    return this.vacationsService.findOne(id);
  }

  @Post(':id/approve')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Aprobar solicitud (solo admin)' })
  @ApiResponse({ status: 200, description: 'Solicitud aprobada' })
  @ApiResponse({ status: 400, description: 'Solicitud no está pendiente' })
  approve(
    @Param('id') id: string,
    @Request() req: any,
    @Body() approveDto: ApproveVacationDto,
  ) {
    const aprobadoPor = `${req.user.nombre} ${req.user.apellidos}`;
    return this.vacationsService.approve(id, aprobadoPor, approveDto.comentarios);
  }

  @Post(':id/reject')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Rechazar solicitud (solo admin)' })
  @ApiResponse({ status: 200, description: 'Solicitud rechazada' })
  @ApiResponse({ status: 400, description: 'Solicitud no está pendiente' })
  reject(
    @Param('id') id: string,
    @Request() req: any,
    @Body() approveDto: ApproveVacationDto,
  ) {
    const aprobadoPor = `${req.user.nombre} ${req.user.apellidos}`;
    return this.vacationsService.reject(id, aprobadoPor, approveDto.comentarios);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar mi solicitud' })
  @ApiResponse({ status: 200, description: 'Solicitud cancelada' })
  @ApiResponse({ status: 400, description: 'No se puede cancelar' })
  cancel(@Param('id') id: string, @Request() req: any) {
    return this.vacationsService.cancel(id, req.user.id);
  }
}
