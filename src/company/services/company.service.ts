import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../schemas/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  public async getAllCompanies() {
    const company = await this.companyModel.aggregate([
      {
        $lookup: {
          from: `users`,
          localField: 'personInChargeId',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: {
          path: '$users',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: `currency`,
          localField: 'currencyId',
          foreignField: '_id',
          as: 'currency',
        },
      },
      {
        $unwind: {
          path: '$currency',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: `company-roles`,
          localField: 'roleId',
          foreignField: '_id',
          as: 'companyRoles',
        },
      },
      {
        $unwind: {
          path: '$companyRoles',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          personInCharge: {
            $concat: ['$users.firstName', ' ', '$users.lastName'],
          },
          personInChargeId: 1,
          email: 1,
          phone: 1,
          eik: 1,
          industry: 1,
          description: 1,
          country: 1,
          city: 1,
          address: 1,
          price: 1,
          vatNumber: 1,
          charging: 1,
          roleId: 1,
          currencyId: 1,
          currency: '$currency.code',
          roleInTheSystem: '$companyRoles.name',
        },
      },
    ]);

    return company;
  }

  public async getCurrentCompany(user) {
    const company = await this.companyModel.aggregate([
      { $match: { _id: user.companyId } },
      {
        $lookup: {
          from: `currency`,
          localField: 'currencyId',
          foreignField: '_id',
          as: 'currency',
        },
      },
      {
        $unwind: {
          path: '$currency',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          currency: '$currency.code',
          currencyId: '$currency._id',
          vatNumber: 1,
        },
      },
    ]);

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
