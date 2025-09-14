import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Request } from 'express';
import { RoleGuard } from 'src/roles/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  public async create(
    @Req() req: Request,
    @Body() createdeviceDto: CreateOrderDto,
  ) {
    const user = req.user;
    return await this.ordersService.create(user, createdeviceDto);
  }

  @Get('')
  public async list(@Req() req: Request) {
    const user = req.user;
    return await this.ordersService.getAllOrders(user);
  }

  @Get('active')
  public async getActiveOrders(@Req() req: Request) {
    const user = req.user;
    return await this.ordersService.getActiveOrders(user);
  }

  @Get('revenue')
  public async getRevenue(@Req() req: Request) {
    const user = req.user;
    return await this.ordersService.getRevenue(user);
  }
}
