import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Holiday, TipoFestivo } from './entities/holiday.entity';
import { MEXICO_HOLIDAYS } from './data/mexico-holidays';

@Injectable()
export class CalendarService {
  private readonly logger = new Logger(CalendarService.name);

  constructor(
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
  ) {}

  /**
   * Carga los días festivos de México en la base de datos
   */
  async seedHolidays(): Promise<void> {
    const existingCount = await this.holidayRepository.count();

    if (existingCount > 0) {
      this.logger.log(`Ya existen ${existingCount} días festivos en la BD`);
      return;
    }

    this.logger.log('Cargando días festivos de México...');

    for (const holiday of MEXICO_HOLIDAYS) {
      const newHoliday = this.holidayRepository.create({
        fecha: new Date(holiday.fecha),
        nombre: holiday.nombre,
        tipo: holiday.tipo,
        anio: holiday.anio,
        activo: true,
      });

      await this.holidayRepository.save(newHoliday);
    }

    this.logger.log(`${MEXICO_HOLIDAYS.length} días festivos cargados`);
  }

  /**
   * Obtiene todos los días festivos
   */
  async findAll(): Promise<Holiday[]> {
    return this.holidayRepository.find({
      where: { activo: true },
      order: { fecha: 'ASC' },
    });
  }

  /**
   * Obtiene los días festivos de un año específico
   */
  async findByYear(year: number): Promise<Holiday[]> {
    return this.holidayRepository.find({
      where: { anio: year, activo: true },
      order: { fecha: 'ASC' },
    });
  }

  /**
   * Obtiene los días festivos en un rango de fechas
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<Holiday[]> {
    return this.holidayRepository.find({
      where: {
        fecha: Between(startDate, endDate),
        activo: true,
      },
      order: { fecha: 'ASC' },
    });
  }

  /**
   * Verifica si una fecha es día festivo
   */
  async isHoliday(date: Date): Promise<boolean> {
    const dateStr = date.toISOString().split('T')[0];
    const holiday = await this.holidayRepository.findOne({
      where: { fecha: new Date(dateStr), activo: true },
    });
    return !!holiday;
  }

  /**
   * Verifica si una fecha es fin de semana
   */
  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Domingo o Sábado
  }

  /**
   * Calcula los días hábiles entre dos fechas (excluyendo fines de semana y festivos)
   */
  async calculateWorkingDays(startDate: Date, endDate: Date): Promise<number> {
    const holidays = await this.findByDateRange(startDate, endDate);
    const holidayDates = new Set(
      holidays.map((h) => h.fecha.toISOString().split('T')[0]),
    );

    let workingDays = 0;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isWeekend = this.isWeekend(currentDate);
      const isHoliday = holidayDates.has(dateStr);

      if (!isWeekend && !isHoliday) {
        workingDays++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return workingDays;
  }

  /**
   * Agrega un nuevo día festivo (para la empresa)
   */
  async addHoliday(
    fecha: Date,
    nombre: string,
    tipo: TipoFestivo = TipoFestivo.EMPRESA,
  ): Promise<Holiday> {
    const holiday = this.holidayRepository.create({
      fecha,
      nombre,
      tipo,
      anio: fecha.getFullYear(),
      activo: true,
    });

    return this.holidayRepository.save(holiday);
  }

  /**
   * Desactiva un día festivo
   */
  async removeHoliday(id: string): Promise<void> {
    await this.holidayRepository.update(id, { activo: false });
  }
}
