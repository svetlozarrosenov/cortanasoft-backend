import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Roles, RolesDocument } from '../schemas/roles.schema';
import mongoose, { Model } from 'mongoose';
import { permissions } from '../constants/back-end';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles.name) private rolesModel: Model<RolesDocument>,
  ) {}

  public async updateRole(_id, rolesData) {
    return await this.rolesModel.updateOne({ _id }, { ...rolesData });
  }

  public async getAllCompanyRoles(companyId) {
    return await this.rolesModel.find({
      companyId: new mongoose.Types.ObjectId(companyId),
    });
  }

  public async getCurrentUserRole(user) {
    console.log('crb_userm', user)
    return await this.rolesModel.findOne({
      _id: new mongoose.Types.ObjectId(user.roleId),
    });
  }

  public async createRole(createRolesDto) {
    const newRoles = new this.rolesModel({
      ...createRolesDto,
    });

    return await newRoles.save();
  }

  public getRolesPermissions() {
    return permissions;
  }
}
