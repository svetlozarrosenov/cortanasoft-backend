import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { ProductIdDto } from './dto/product-id.dto';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts(@Req() req: Request) {
    return await this.productsService.getProducts(req.user);
  }

  @Put('update/:id')
  async getProduct(
    @Param('id') productIdDto: any,
    @Body() test,
    @Req() req: Request,
  ) {
    return await this.productsService.updateProduct(
      productIdDto,
      test,
      req.user,
    );
  }

  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
  ) {
    return await this.productsService.createProduct(createProductDto, req.user);
  }
}
