import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ConfirmPasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(1000)
  token: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  confirmNewPassword: string;
}
