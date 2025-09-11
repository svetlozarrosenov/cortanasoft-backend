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
import { LocationsService } from '../services/locations.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async getLocations(@Req() req: Request) {
    return await this.locationsService.getLocations(req.user);
  }

  @Put('update/:id')
  async getProduct(
    @Param('id') productIdDto: any,
    @Body() test,
    @Req() req: Request,
  ) {
    return await this.locationsService.updateLocation(
      productIdDto,
      test,
      req.user,
    );
  }

  @Post('create')
  async createLocations(@Req() req: Request, @Body() LocationsDto: any) {
    return await this.locationsService.createLocation(LocationsDto, req.user);
  }
}
