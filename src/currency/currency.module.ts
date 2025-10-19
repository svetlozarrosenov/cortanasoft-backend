import { Module } from '@nestjs/common';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Currency, CurrencySchema } from './schemas/currency.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Currency.name, schema: CurrencySchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
