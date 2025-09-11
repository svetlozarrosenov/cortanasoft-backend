import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RoleSettings,
  RoleSettingsDocument,
} from '../schemas/role-settings.schema';

@Injectable()
export class RoleSettingsService {
  constructor(
    @InjectModel(RoleSettings.name) private roleSettingsModel: Model<RoleSettingsDocument>,
  ) {}

  public async getCurrentCompany(user) {
    const roleSettings = await this.roleSettingsModel.findOne({});
    return roleSettings;
  }
}
