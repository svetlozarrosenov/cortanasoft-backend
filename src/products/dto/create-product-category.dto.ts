import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty({ message: 'Името е задължително' })
  @IsString({ message: 'Името трябва да е стринг' })
  @Length(3, 50, { message: 'Името трябва да е между 3 и 50 символа' })
  name: string;

  @IsNotEmpty({ message: 'Описанието е задължително' })
  @IsString({ message: 'Описанието трябва да е стринг' })
  @Length(10, 500, { message: 'Описанието трябва да е между 10 и 500 символа' })
  description: string;
}
