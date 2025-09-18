import { Module } from '@nestjs/common';
import { LocationsController } from './controllers/locations.controller';
import { LocationsService } from './services/locations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Locations, LocationsSchema } from './schemas/locations.schema';
import { Roles, RolesSchema } from 'src/roles/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Locations.name, schema: LocationsSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
