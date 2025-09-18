import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FirebaseDevices,
  FirebaseDevicesDocument,
} from '../schemas/firebase-devices.schema';

@Injectable()
export class FirebaseDevicesProvider {
  constructor(
    @InjectModel(FirebaseDevices.name)
    private firebaseDevicesModel: Model<FirebaseDevicesDocument>,
  ) {}

  public async getUserTokens(userEmail) {
    return await this.firebaseDevicesModel.find({ userEmail });
  }

  public async firebaseIdExists(firebaseId: string) {
    return await this.firebaseDevicesModel.findOne({
      firebaseDeviceId: firebaseId,
    });
  }

  public async addFirebaseId(user, firebaseId: string) {
    const newFirebaseDeviceId = new this.firebaseDevicesModel({
      userEmail: user.email,
      userId: user._id,
      firebaseDeviceId: firebaseId,
    });

    return await newFirebaseDeviceId.save();
  }
}
