import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './stats.service';
import { Public } from '../auth/public.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  
  @Public()
  @Get()
  async getStatistics() {
    return this.statisticsService.getStatistics();
  }
}