import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { VacationRequest } from '../../vacations/entities/vacation-request.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  employeeId: string; // ID interno de la empresa

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hash bcrypt

  @Column({ nullable: true })
  departamento: string;

  @Column({ nullable: true })
  puesto: string;

  @Column({ type: 'date' })
  fechaIngreso: Date;

  @Column({ type: 'int', default: 12 })
  diasVacacionesAnuales: number; // Según antigüedad

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  diasDisponibles: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  diasUsados: number;

  @Column({ nullable: true })
  mondayUserId: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ default: false })
  esAdmin: boolean; // Para RH

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => VacationRequest, (request) => request.employee)
  solicitudes: VacationRequest[];

  // Getter para nombre completo
  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellidos}`;
  }
}
