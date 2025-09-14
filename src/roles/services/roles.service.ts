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

  private collectApis(permissions: any[]): string[] {
    const apis: string[] = [];

    for (const permission of permissions) {
      if (permission.apis && Array.isArray(permission.apis)) {
        apis.push(...permission.apis);
      }
      if (permission.children && Array.isArray(permission.children)) {
        apis.push(...this.collectApis(permission.children));
      }
    }

    return [...new Set(apis)];
  }

  public async updateRole(_id, rolesData) {
    const backendPermissions = this.collectApis(rolesData.permissions || []);

    return await this.rolesModel.updateOne(
      { _id },
      {
        ...rolesData,
        backendPermissions,
      },
    );
  }

  async removeRole(_id: string): Promise<{ deletedCount: number }> {
    return await this.rolesModel.deleteOne({ _id }).exec();
  }

  public async getAllCompanyRoles(companyId) {
    return await this.rolesModel.find({
      companyId: new mongoose.Types.ObjectId(companyId),
    });
  }

  public async getCurrentUserRole(user) {
    return await this.rolesModel.findOne({
      _id: new mongoose.Types.ObjectId(user.roleId),
    });
  }

  public async createRole(createRolesDto) {
    const backendPermissions = this.collectApis(
      createRolesDto.permissions || [],
    );

    const newRoles = new this.rolesModel({
      ...createRolesDto,
      backendPermissions,
    });

    return await newRoles.save();
  }

  public getRolesPermissions() {
    return permissions;
  }
}
