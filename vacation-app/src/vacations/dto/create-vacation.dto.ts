import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { TipoLicencia } from '../entities/vacation-request.entity';

export class CreateVacationDto {
  @ApiProperty({
    example: '2024-12-20',
    description: 'Fecha de inicio de las vacaciones (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  fechaInicio: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha de fin de las vacaciones (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  fechaFin: string;

  @ApiPropertyOptional({
    enum: TipoLicencia,
    example: TipoLicencia.VACACIONES,
    description: 'Tipo de licencia',
    default: TipoLicencia.VACACIONES,
  })
  @IsOptional()
  @IsEnum(TipoLicencia, { message: 'Tipo de licencia inválido' })
  tipoLicencia?: TipoLicencia;

  @ApiPropertyOptional({
    example: 'Viaje familiar',
    description: 'Motivo de la solicitud (opcional)',
  })
  @IsOptional()
  motivo?: string;
}
