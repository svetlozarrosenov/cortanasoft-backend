import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';

export class ContactMessagesDto {
  @IsString({ message: 'Името трябва да бъде текст.' })
  @IsNotEmpty({ message: 'Името е задължително.' })
  @MinLength(2, { message: 'Името трябва да е поне 2 символа.' })
  @MaxLength(50, { message: 'Името не може да надвишава 50 символа.' })
  name: string;

  @IsEmail({}, { message: 'Моля, въведете валиден имейл адрес.' })
  @IsNotEmpty({ message: 'Имейлът е задължителен.' })
  @MaxLength(100, { message: 'Имейлът не може да надвишава 100 символа.' })
  email: string;

  @IsString({ message: 'Телефонът трябва да бъде текст.' })
  @IsNotEmpty({ message: 'Телефонът е задължителен.' })
  @IsPhoneNumber('BG', {
    message:
      'Моля, въведете валиден български телефонен номер (напр. +359 87 123 4567).',
  })
  @MaxLength(20, { message: 'Телефонът не може да надвишава 15 символа.' })
  phone: string;

  @IsString({ message: 'Темата трябва да бъде текст.' })
  @IsNotEmpty({ message: 'Темата е задължителна.' })
  @MinLength(3, { message: 'Темата трябва да е поне 3 символа.' })
  @MaxLength(100, { message: 'Темата не може да надвишава 100 символа.' })
  subject: string;

  @IsString({ message: 'Съобщението трябва да бъде текст.' })
  @IsNotEmpty({ message: 'Съобщението е задължително.' })
  @MinLength(10, { message: 'Съобщението трябва да е поне 10 символа.' })
  @MaxLength(1000, {
    message: 'Съобщението не може да надвишава 1000 символа.',
  })
  message: string;
}
