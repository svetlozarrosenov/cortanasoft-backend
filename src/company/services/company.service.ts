import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async getCurrentCompany(user) {
    const company = await this.companyModel
      .findOne({ _id: user.companyId })
      .select('name');

      return company;
  }
}
