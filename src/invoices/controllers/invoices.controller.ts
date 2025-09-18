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
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/roles/guards/role.guard';
import { InvoicesService } from '../services/invoices.service';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  public async getAllInvoicess(@Req() req: Request) {
    return await this.invoicesService.getAllInvoices(req.user);
  }

  @Post('create')
  public async createInvoices(
    @Body() createInvoicesDto: any,
    @Req() req: Request,
  ) {
    return await this.invoicesService.createInvoice(
      createInvoicesDto,
      req.user,
    );
  }

  @Put('update/:id')
  async updateInvoices(
    @Param('id') InvoicesId: any,
    @Body() InvoicesData,
    @Req() req: Request,
  ) {
    return await this.invoicesService.updateInvoice(
      InvoicesId,
      InvoicesData,
      req.user,
    );
  }
}
