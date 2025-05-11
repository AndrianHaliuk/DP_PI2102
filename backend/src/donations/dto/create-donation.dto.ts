import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateDonationDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  campaignId: number;

  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean = false;
}