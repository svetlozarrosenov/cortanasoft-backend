import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';
import { CompanyRolesEnum } from 'src/company-roles/constants';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async getAllCompanies() {
    const company = await this.companyModel.find({});

    return company;
  }

  public async getCurrentCompany(user) {
    const company = await this.companyModel
      .findOne({ _id: user.companyId })
      .select('name');

    return company;
  }

  public async createCompany(companyDto, user) {
    const newCompany = new this.companyModel({
      ...companyDto,
    });

    return await newCompany.save();
  }

  public async updateCompany(_id, companyData, user) {
    const updatedTask = await this.companyModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...companyData,
        },
      },
    );

    return updatedTask;
  }
}
