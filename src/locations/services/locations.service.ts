import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Locations, LocationsDocument } from '../schemas/locations.schema';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Locations.name)
    private locationsModel: Model<LocationsDocument>,
  ) {}

  public async getLocations(user) {
    const Locations = await this.locationsModel.find({
      companyId: user.companyId,
    });

    return Locations;
  }

  public async updateLocation(_id, productData, user) {
    return await this.locationsModel.updateOne(
      { _id, companyId: user.companyId },
      { ...productData },
    );
  }

  public async deleteLocation(_id): Promise<{ deletedCount: number }> {
    return await this.locationsModel.deleteOne({ _id });
  }

  public async createLocation(createLocationDto, user) {
    const newLocation = new this.locationsModel({
      ...createLocationDto,
      companyId: user.companyId,
    });

    return await newLocation.save();
  }
}
