import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CompanyRolesService } from '../services/company-roles.service';
import { CompanyRolesGuard } from '../guards/company-roles.guard';
import { CompanyRoles } from '../decorators/company-roles.decorator';
import { RoleGuard } from 'src/roles/guards/role.guard';
import { CompanyRolesEnum } from '../constants';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('company-roles')
export class CompanyRolesController {
  public constructor(public companyRolesService: CompanyRolesService) {}

  @UseGuards(CompanyRolesGuard, RoleGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Get('')
  public async getAllCompanies() {
    return await this.companyRolesService.getAllCompanySystemRoles();
  }
}
