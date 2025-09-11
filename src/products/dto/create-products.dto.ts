// src/products/dto/create-product.dto.ts

import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsUrl,
  IsOptional,
} from 'class-validator';

enum ProductType {
  SENSOR = 'sensor',
  RECEIVER = 'receiver'
}

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  price?: string;
}