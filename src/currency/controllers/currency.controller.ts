import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CurrencyService } from '../services/currency.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/roles/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('currency')
export class CurrencyController {
  constructor(public currencyService: CurrencyService) {}
  @Get()
  public async getAllCurrencies(@Req() req: Request) {
    return await this.currencyService.getAllCurrencies(req.user);
  }
}
