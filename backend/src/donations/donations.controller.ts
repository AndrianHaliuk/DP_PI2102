import { Controller, Post, Body, Req } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly service: DonationsService) {}

  @Post()
  donate(@Body() dto: CreateDonationDto, @Req() req: any) {
    const userId = req.user.id;
    return this.service.donate(dto, userId);
  }
}