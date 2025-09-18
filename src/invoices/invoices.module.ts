import { Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoices.controller';
import { InvoicesService } from './services/invoices.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoices, InvoicesSchema } from './schemas/invoices.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invoices.name, schema: InvoicesSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
