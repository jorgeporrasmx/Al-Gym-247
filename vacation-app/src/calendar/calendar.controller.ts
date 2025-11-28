import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { CheckDatesDto } from './dto/check-dates.dto';

@ApiTags('calendar')
@Controller('calendar')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get('holidays')
  @ApiOperation({ summary: 'Obtener todos los días festivos' })
  @ApiResponse({ status: 200, description: 'Lista de días festivos' })
  findAllHolidays() {
    return this.calendarService.findAll();
  }

  @Get('holidays/:year')
  @ApiOperation({ summary: 'Obtener días festivos por año' })
  @ApiResponse({ status: 200, description: 'Lista de días festivos del año' })
  findHolidaysByYear(@Param('year') year: number) {
    return this.calendarService.findByYear(year);
  }

  @Post('check-dates')
  @ApiOperation({ summary: 'Calcular días hábiles entre dos fechas' })
  @ApiResponse({ status: 200, description: 'Días hábiles calculados' })
  async checkDates(@Body() checkDatesDto: CheckDatesDto) {
    const startDate = new Date(checkDatesDto.fechaInicio);
    const endDate = new Date(checkDatesDto.fechaFin);

    const workingDays = await this.calendarService.calculateWorkingDays(
      startDate,
      endDate,
    );

    const holidays = await this.calendarService.findByDateRange(
      startDate,
      endDate,
    );

    return {
      fechaInicio: checkDatesDto.fechaInicio,
      fechaFin: checkDatesDto.fechaFin,
      diasHabiles: workingDays,
      diasFestivosEnRango: holidays.map((h) => ({
        fecha: h.fecha,
        nombre: h.nombre,
      })),
    };
  }

  @Get('is-holiday')
  @ApiOperation({ summary: 'Verificar si una fecha es día festivo' })
  @ApiQuery({ name: 'date', type: String, example: '2024-12-25' })
  @ApiResponse({ status: 200, description: 'Resultado de la verificación' })
  async isHoliday(@Query('date') date: string) {
    const isHoliday = await this.calendarService.isHoliday(new Date(date));
    const isWeekend = this.calendarService.isWeekend(new Date(date));

    return {
      fecha: date,
      esFinDeSemana: isWeekend,
      esFestivo: isHoliday,
      esLaborable: !isWeekend && !isHoliday,
    };
  }

  @Post('holidays')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Agregar día festivo (solo admin)' })
  @ApiResponse({ status: 201, description: 'Día festivo creado' })
  addHoliday(@Body() createHolidayDto: CreateHolidayDto) {
    return this.calendarService.addHoliday(
      new Date(createHolidayDto.fecha),
      createHolidayDto.nombre,
      createHolidayDto.tipo,
    );
  }

  @Delete('holidays/:id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Eliminar día festivo (solo admin)' })
  @ApiResponse({ status: 200, description: 'Día festivo eliminado' })
  removeHoliday(@Param('id') id: string) {
    return this.calendarService.removeHoliday(id);
  }
}
