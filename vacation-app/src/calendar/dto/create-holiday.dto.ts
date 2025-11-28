import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { TipoFestivo } from '../entities/holiday.entity';

export class CreateHolidayDto {
  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha del día festivo (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({
    example: 'Fin de Año',
    description: 'Nombre del día festivo',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({
    enum: TipoFestivo,
    example: TipoFestivo.EMPRESA,
    description: 'Tipo de día festivo',
    default: TipoFestivo.EMPRESA,
  })
  @IsOptional()
  @IsEnum(TipoFestivo)
  tipo?: TipoFestivo;
}
