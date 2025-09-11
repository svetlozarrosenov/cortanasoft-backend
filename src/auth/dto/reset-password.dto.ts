import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;
}
