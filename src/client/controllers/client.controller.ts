import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { CreateClientDto } from '../dto/create-client.dto';
import { RoleGuard } from 'src/roles/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  public async getAllClients(@Req() req: Request) {
    return await this.clientService.getAllClients(req.user);
  }

  @Post('create')
  public async createClient(
    @Body() createClientDto: CreateClientDto,
    @Req() req: Request,
  ) {
    return await this.clientService.createClient(createClientDto, req.user);
  }
}
