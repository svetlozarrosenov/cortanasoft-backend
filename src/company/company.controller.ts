import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CompanyRolesGuard } from 'src/company-roles/guards/company-roles.guard';
import { CompanyRoles } from 'src/company-roles/decorators/company-roles.decorator';
import { CompanyRolesEnum } from 'src/company-roles/constants';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Get('')
  public async getAllCompanies(@Req() req: Request) {
    return await this.companyService.getAllCompanies();
  }

  @Get('current')
  public async getCurrentCompany(@Req() req: Request) {
    return await this.companyService.getCurrentCompany(req.user);
  }

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Post('create')
  public async createCompany(@Req() req: Request, @Body() companyDto) {
    return await this.companyService.createCompany(companyDto, req.user);
  }

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Put('update/:id')
  async updateCompany(
    @Param('id') updateCompanyDto: any,
    @Body() companyData,
    @Req() req: Request,
  ) {
    return await this.companyService.updateCompany(
      updateCompanyDto,
      companyData,
      req.user,
    );
  }
}
