import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from './schemas/roles.schema';
import { Company, CompanySchema } from 'src/company/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Roles.name, schema: RolesSchema }]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
