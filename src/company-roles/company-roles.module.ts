import { Module } from '@nestjs/common';
import { CompanyRolesController } from './controllers/company-roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';
import { Company, CompanySchema } from 'src/company/schemas/company.schema';
import { CompanyRolesService } from './services/company-roles.service';
import { CompanyRoles } from './decorators/company-roles.decorator';
import { CompanyRolesSchema } from './schemas/company-roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Company.name, schema: CompanySchema },
      { name: CompanyRoles.name, schema: CompanyRolesSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [CompanyRolesController],
  providers: [CompanyRolesService],
})
export class CompanyRolesModule {}
