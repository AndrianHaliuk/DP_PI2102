import { IsString, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @Length(10, 1000)
  message: string;
}
