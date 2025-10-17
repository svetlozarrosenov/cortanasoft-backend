import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsNumber()
  price: string;
}
