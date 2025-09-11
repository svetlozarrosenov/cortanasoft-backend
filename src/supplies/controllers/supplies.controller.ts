import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SuppliesService } from '../services/Supplies.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { LotsService } from 'src/lots/services/lots.service';
import { User } from 'src/user/schemas/user.schema';
import mongoose, { Types } from 'mongoose';
@UseGuards(JwtAuthGuard)
@Controller('supplies')
export class SuppliesController {
  constructor(
    private SuppliesService: SuppliesService,
    private lotsService: LotsService,
  ) {}

  @Post('supplier/create')
  public async createSupplier(
    @Body() createSuppliesDto: any,
    @Req() req: Request,
  ) {
    return await this.SuppliesService.createSupplier(
      createSuppliesDto,
      req.user,
    );
  }

  @Get('suppliers')
  public async getAllSuppliers(@Req() req: Request) {
    return await this.SuppliesService.getAllSuppliers(req.user);
  }

  @Post('create')
  public async createSupplies(
    @Body() createSuppliesDto: any,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const supply = await this.SuppliesService.createSupplies(
      createSuppliesDto,
      user,
    );

    return supply;
  }

  @Get('')
  public async getAllSupplies(@Req() req: Request) {
    return await this.SuppliesService.getAllSupplies(req.user);
  }
}
