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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesService } from '../services/roles.service';
import { Request } from 'express';
import { CompanyRolesGuard } from 'src/company-roles/guards/company-roles.guard';
import { CompanyRolesEnum } from 'src/company-roles/constants';
import { CompanyRoles } from 'src/company-roles/decorators/company-roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('user')
  public async getCurrentUserRole(@Req() req: Request) {
    return await this.rolesService.getCurrentUserRole(req.user);
  }

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Post('create')
  public async createRole(@Body() createProductDto) {
    return await this.rolesService.createRole(createProductDto);
  }

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Put('update/:id')
  async updateRole(@Param('id') roleIdDto: any, @Body() test) {
    return await this.rolesService.updateRole(roleIdDto, test);
  }

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Get('permissions')
  public async getRolesPermissions() {
    return await this.rolesService.getRolesPermissions();
  }

  @UseGuards(CompanyRolesGuard)
  @CompanyRoles([CompanyRolesEnum.superAdminCompanyRoleId])
  @Get('company/:id')
  public async getAllCompanyRoles(@Param('id') companyId: string) {
    return await this.rolesService.getAllCompanyRoles(companyId);
  }
}
