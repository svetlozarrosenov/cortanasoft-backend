import {
  Body,
  Controller,
  Delete,
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
import { RoleGuard } from 'src/roles/guards/role.guard';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async getLocations(@Req() req: Request) {
    return await this.locationsService.getLocations(req.user);
  }

  @Put('update/:id')
  async updateLocation(
    @Param('id') locationId: any,
    @Body() test,
    @Req() req: Request,
  ) {
    return await this.locationsService.updateLocation(
      locationId,
      test,
      req.user,
    );
  }

  @Delete('delete/:id')
  async deleteLocation(@Param('id') locationId: any) {
    return await this.locationsService.deleteLocation(locationId);
  }

  @Post('create')
  async createLocations(@Req() req: Request, @Body() LocationsDto: any) {
    return await this.locationsService.createLocation(LocationsDto, req.user);
  }
}
