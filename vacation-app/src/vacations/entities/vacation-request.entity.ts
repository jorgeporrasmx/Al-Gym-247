import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';

export enum EstadoSolicitud {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
  CANCELADA = 'cancelada',
}

export enum TipoLicencia {
  VACACIONES = 'vacaciones',
  MATERNIDAD = 'maternidad',
  PATERNIDAD = 'paternidad',
  INCAPACIDAD = 'incapacidad',
  ADOPCION = 'adopcion',
  LUTO = 'luto',
  MATRIMONIO = 'matrimonio',
  OTRO = 'otro',
}

@Entity('vacation_requests')
export class VacationRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee, (employee) => employee.solicitudes)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'employee_id' })
  employeeId: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ type: 'date' })
  fechaFin: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  diasSolicitados: number;

  @Column({
    type: 'enum',
    enum: TipoLicencia,
    default: TipoLicencia.VACACIONES,
  })
  tipoLicencia: TipoLicencia;

  @Column({ type: 'text', nullable: true })
  motivo: string;

  @Column({
    type: 'enum',
    enum: EstadoSolicitud,
    default: EstadoSolicitud.PENDIENTE,
  })
  estado: EstadoSolicitud;

  @Column({ nullable: true })
  mondayItemId: string; // ID del item en Monday.com

  @Column({ nullable: true })
  aprobadoPor: string; // Nombre de quien aprobó

  @Column({ type: 'timestamp', nullable: true })
  fechaAprobacion: Date;

  @Column({ type: 'text', nullable: true })
  comentariosRh: string;

  @Column({ nullable: true })
  tokenAprobacion: string; // Token único para el formulario de aprobación

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
