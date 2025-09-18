import { Module } from '@nestjs/common';
import { CompanyRolesController } from './controllers/company-roles.controller';

@Module({
  controllers: [CompanyRolesController],
  providers: [],
})
export class CompanyRolesModule {}
