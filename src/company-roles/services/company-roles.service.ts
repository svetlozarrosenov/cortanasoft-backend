import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CompanyRoles,
  CompanyRolesDocument,
} from '../schemas/company-roles.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class CompanyRolesService {
  constructor(
    @InjectModel(CompanyRoles.name)
    private CompanyRolesModel: Model<CompanyRolesDocument>,
  ) {}

  public async updateRole(_id, CompanyRolesData, user) {
    return await this.CompanyRolesModel.updateOne(
      { _id, companyId: user.companyId },
      { ...CompanyRolesData },
    );
  }

  public async getAllCompanyCompanyRoles(user) {
    return await this.CompanyRolesModel.find({
      companyId: new mongoose.Types.ObjectId(user.companyId),
    });
  }

  public async createRole(createCompanyRolesDto, user) {
    const newCompanyRoles = new this.CompanyRolesModel({
      ...createCompanyRolesDto,
      companyId: user.companyId,
    });

    return await newCompanyRoles.save();
  }
}
