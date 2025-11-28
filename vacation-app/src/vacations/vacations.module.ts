import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacationsService } from './vacations.service';
import { VacationsController } from './vacations.controller';
import { ApprovalController } from './approval.controller';
import { VacationRequest } from './entities/vacation-request.entity';
import { EmployeesModule } from '../employees/employees.module';
import { CalendarModule } from '../calendar/calendar.module';
import { MondayModule } from '../monday/monday.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VacationRequest]),
    EmployeesModule,
    CalendarModule,
    forwardRef(() => MondayModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [VacationsController, ApprovalController],
  providers: [VacationsService],
  exports: [VacationsService],
})
export class VacationsModule {}
