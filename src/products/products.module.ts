import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from './schemas/products.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';
import {
  ProductsCategories,
  ProductsCategoriesSchema,
} from './schemas/product-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
      { name: ProductsCategories.name, schema: ProductsCategoriesSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
