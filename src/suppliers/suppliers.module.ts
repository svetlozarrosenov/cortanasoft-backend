import { Module } from '@nestjs/common';
import { SuppliersController } from './controllers/suppliers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Suppliers, SuppliersSchema } from './schemas/suppliers.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';
import { SuppliersService } from './services/suppliers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Suppliers.name, schema: SuppliersSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
