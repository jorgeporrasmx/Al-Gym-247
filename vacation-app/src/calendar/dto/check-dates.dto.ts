import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CheckDatesDto {
  @ApiProperty({
    example: '2024-12-20',
    description: 'Fecha de inicio (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @ApiProperty({
    example: '2024-12-31',
    description: 'Fecha de fin (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;
}
