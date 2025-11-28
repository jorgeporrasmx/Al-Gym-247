import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ApproveVacationDto {
  @ApiPropertyOptional({
    example: 'Aprobado. Disfruta tus vacaciones.',
    description: 'Comentarios de RH (opcional)',
  })
  @IsOptional()
  @IsString()
  comentarios?: string;
}
