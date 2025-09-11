import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './services/company.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('current')
  public async getCurrentCompany(@Req() req: Request) {
    return await this.companyService.getCurrentCompany(req.user);
  }
}
