import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LotsService } from '../services/lots.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/roles/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('lots')
export class LotsController {
  constructor(private lotsService: LotsService) {}

  @Get('')
  async getLots(@Req() req: Request) {
    return await this.lotsService.getLots(req.user);
  }

  @Get('available')
  async getAvailableLots(@Req() req: Request) {
    return await this.lotsService.getAvailableLots(req.user);
  }

  @Post('create')
  async createLots(@Req() req: Request, @Body() lotsDto: any) {
    return await this.lotsService.createLots(lotsDto);
  }
}
