import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsDateString,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'EMP001',
    description: 'ID único del empleado en la empresa',
  })
  @IsNotEmpty({ message: 'El ID de empleado es requerido' })
  employeeId: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del empleado',
  })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @ApiProperty({
    example: 'Pérez García',
    description: 'Apellidos del empleado',
  })
  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  apellidos: string;

  @ApiProperty({
    example: 'empleado@empresa.com',
    description: 'Correo electrónico del empleado',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsNotEmpty({ message: 'El correo es requerido' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña (mínimo 6 caracteres)',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiPropertyOptional({
    example: 'Tecnología',
    description: 'Departamento del empleado',
  })
  @IsOptional()
  departamento?: string;

  @ApiPropertyOptional({
    example: 'Desarrollador',
    description: 'Puesto del empleado',
  })
  @IsOptional()
  puesto?: string;

  @ApiProperty({
    example: '2023-01-15',
    description: 'Fecha de ingreso a la empresa (YYYY-MM-DD)',
  })
  @IsDateString({}, { message: 'Debe ser una fecha válida (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de ingreso es requerida' })
  fechaIngreso: string;

  @ApiPropertyOptional({
    example: 12,
    description: 'Días de vacaciones anuales según antigüedad',
    default: 12,
  })
  @IsOptional()
  @IsNumber()
  diasVacacionesAnuales?: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Si el empleado es administrador (RH)',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  esAdmin?: boolean;
}
