import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmUserDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}
