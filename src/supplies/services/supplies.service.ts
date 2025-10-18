import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Supplies, SuppliesDocument } from '../schemas/supplies.schema';
import { Suppliers, SuppliersDocument } from '../schemas/suppliers.schema';
import {
  Products,
  ProductsDocument,
} from 'src/products/schemas/products.schema';
import { LotsService } from 'src/lots/services/lots.service';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectModel(Supplies.name) private suppliesModel: Model<SuppliesDocument>,
    @InjectModel(Suppliers.name)
    private suppliersModel: Model<SuppliersDocument>,
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
    private lotsService: LotsService,
  ) {}

  public async getAllSupplies(user) {
    const supplies = await this.suppliesModel
      .aggregate([
        { $match: { companyId: user.companyId } },
        {
          $lookup: {
            from: `suppliers`,
            localField: 'supplierId',
            foreignField: '_id',
            as: 'suppliers',
          },
        },
        {
          $unwind: {
            path: '$suppliers',
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
          $project: {
            totalPrice: 1,
            status: 1,
            currency: '$currency.code',
            deliveryDate: 1,
            products: 1,
            companyId: 1,
            companyName: '$suppliers.companyName',
          },
        },
      ])
      .exec();

    return supplies;
  }

  public async getAllSuppliers(user) {
    const Suppliers = await this.suppliersModel
      .find({ companyId: user.companyId })
      .exec();
    return Suppliers;
  }

  public async createSupplies(createSuppliesDto, user) {
    const defaultLotNumber = `lot-${Date.now()}`;

    const newSupplies = new this.suppliesModel({
      ...createSuppliesDto,
      companyId: user.companyId,
    });

    const lotsData = createSuppliesDto.products.map((product) => {
      return {
        ...product,
        productId: product.productId
          ? new mongoose.Types.ObjectId(product.productId)
          : product.productId,
        status: product.quantity >= 1 ? 'available' : 'sold',
        supplierId: createSuppliesDto.supplierId
          ? new mongoose.Types.ObjectId(createSuppliesDto.supplierId)
          : createSuppliesDto.supplierId,
        warehouseId: createSuppliesDto.warehouseId
          ? new mongoose.Types.ObjectId(createSuppliesDto.warehouseId)
          : createSuppliesDto.warehouseId,
        companyId: user.companyId,
        locationId: createSuppliesDto.locationId,
        lotNumber: product.lotNumber ? product.lotNumber : defaultLotNumber,
      };
    });
    await this.lotsService.createLots(lotsData);

    return await newSupplies.save();
  }

  public async createSupplier(createSuppliersDto, user) {
    const newSuppliers = new this.suppliersModel({
      ...createSuppliersDto,
      companyId: user.companyId,
    });

    return await newSuppliers.save();
  }
}
