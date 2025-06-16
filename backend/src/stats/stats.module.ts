import { Module } from '@nestjs/common';
import { StatisticsController } from './stats.controller';
import { StatisticsService } from './stats.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, PrismaService],
})
export class StatisticsModule {}