import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/company/schemas/company.schema';
import { Client, ClientSchema } from './schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
