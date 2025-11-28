import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MondayService } from './monday.service';

@Module({
  imports: [ConfigModule],
  providers: [MondayService],
  exports: [MondayService],
})
export class MondayModule {}
