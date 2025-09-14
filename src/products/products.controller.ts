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
import { Request } from 'express';
import { RoleGuard } from 'src/roles/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts(@Req() req: Request) {
    return await this.productsService.getProducts(req.user);
  }

  @Put('update/:id')
  async updateProduct(
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
