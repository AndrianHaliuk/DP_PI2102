import { IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(1, 100)
  subject: string;

  @IsString()
  @Length(1, 1000)
  message: string;
}