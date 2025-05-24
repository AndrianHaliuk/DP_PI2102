import { IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(0, 1000)
  message: string;
}
