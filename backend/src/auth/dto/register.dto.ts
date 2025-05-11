import { IsEmail, IsString, IsOptional } from 'class-validator';
export class RegisterDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly name?: string;
}