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
import { SuppliersService } from '../services/suppliers.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Types } from 'mongoose';
import { RoleGuard } from 'src/roles/guards/role.guard';
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(private suppliersService: SuppliersService) {}

  @Get('')
  public async getAllSuppliers(@Req() req: Request) {
    return await this.suppliersService.getAllSuppliers(req.user);
  }

  @Post('create')
  public async createSupplier(
    @Body() createSuppliersDto: any,
    @Req() req: Request,
  ) {
    return await this.suppliersService.createSupplier(
      createSuppliersDto,
      req.user,
    );
  }

  @Put('update/:id')
  public async updateSupplier(
    @Body() createSuppliersDto: any,
    @Req() req: Request,
    @Param('id') supplyId: any,
  ) {
    return await this.suppliersService.updateSupplier(
      supplyId,
      createSuppliersDto,
      req.user,
    );
  }
}
