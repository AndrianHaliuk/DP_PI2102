import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Number)
  @IsNumber()
  goalAmount: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
