import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';
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
  @Min(1)
  @Max(3)
  @IsOptional()
  priority?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
