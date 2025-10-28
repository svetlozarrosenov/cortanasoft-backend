import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Suppliers, SuppliersDocument } from '../schemas/suppliers.schema';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Suppliers.name)
    private suppliersModel: Model<SuppliersDocument>,
  ) {}

  public async getAllSuppliers(user) {
    const Suppliers = await this.suppliersModel
      .find({ companyId: user.companyId })
      .exec();
    return Suppliers;
  }

  public async createSupplier(createSuppliersDto, user) {
    const newSuppliers = new this.suppliersModel({
      ...createSuppliersDto,
      companyId: user.companyId,
    });

    return await newSuppliers.save();
  }

  public async updateSupplier(id: string, updateSuppliersDto: any, user: any) {
    const supplier = await this.suppliersModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
      companyId: user.companyId,
    });

    if (!supplier) {
      throw new BadRequestException(`Доставчикът с ID ${id} не е намерен.`);
    }

    console.log('crb_updateSuppliersDto', updateSuppliersDto)
    Object.assign(supplier, updateSuppliersDto);

    return await supplier.save();
  }
}
