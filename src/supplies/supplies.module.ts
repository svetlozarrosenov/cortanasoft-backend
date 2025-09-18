import { Module } from '@nestjs/common';
import { SuppliesController } from './controllers/supplies.controller';
import { SuppliesService } from './services/supplies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplies, SuppliesSchema } from './schemas/supplies.schema';
import { Suppliers, SuppliersSchema } from './schemas/suppliers.schema';
import { Products, ProductsSchema } from 'src/products/schemas/products.schema';
import { LotsService } from 'src/lots/services/lots.service';
import { Lots, LotsSchema } from 'src/lots/schemas/lots.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Supplies.name, schema: SuppliesSchema },
      { name: Suppliers.name, schema: SuppliersSchema },
      { name: Products.name, schema: ProductsSchema },
      { name: Lots.name, schema: LotsSchema },
      { name: Roles.name, schema: RolesSchema }
    ]),
  ],
  controllers: [SuppliesController],
  providers: [SuppliesService, LotsService],
})
export class SuppliesModule {}
