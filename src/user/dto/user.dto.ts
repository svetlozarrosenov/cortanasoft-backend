import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    middleName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}