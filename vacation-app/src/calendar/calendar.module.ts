import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { Holiday } from './entities/holiday.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday])],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule implements OnModuleInit {
  constructor(private calendarService: CalendarService) {}

  async onModuleInit() {
    // Cargar días festivos de México al iniciar
    await this.calendarService.seedHolidays();
  }
}
