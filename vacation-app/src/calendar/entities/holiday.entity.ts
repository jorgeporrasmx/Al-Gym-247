import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from 'typeorm';

export enum TipoFestivo {
  OFICIAL = 'oficial', // Días festivos oficiales (LFT)
  EMPRESA = 'empresa', // Días adicionales de la empresa
  PUENTE = 'puente', // Días puente
}

@Entity('holidays')
@Unique(['fecha'])
export class Holiday {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  fecha: Date;

  @Column()
  nombre: string;

  @Column({
    type: 'enum',
    enum: TipoFestivo,
    default: TipoFestivo.OFICIAL,
  })
  tipo: TipoFestivo;

  @Column({ type: 'int' })
  anio: number;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
