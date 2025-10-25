import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Lots, LotsDocument } from '../schemas/lots.schema';

@Injectable()
export class LotsService {
  constructor(@InjectModel(Lots.name) private lotsModel: Model<LotsDocument>) {}

  public async getLots(user) {
    const Lots = await this.lotsModel.aggregate([
      {
        $match: {
          companyId: user.companyId,
        },
      },
      {
        $lookup: {
          from: `products`,
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: {
          path: '$product',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: `products-categories`,
          localField: 'product.categoryId',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: `currency`,
          localField: 'currencyId',
          foreignField: '_id',
          as: 'currencyData',
        },
      },
      {
        $unwind: {
          path: '$currencyData',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          productDetails: '$product',
          status: 1,
          expiryDate: 1,
          quantity: 1,
          serialNumber: 1,
          salePrice: '$product.salePrice',
          name: '$product.name',
          model: '$product.model',
          description: '$product.description',
          categoryId: 1,
          category: '$categories.name',
          batchNotes: 1,
          vatRate: 1,
          currencyRate: 1,
          costPrice: 1,
          totalCostPrice: 1,
          lotNumber: 1,
          currency: '$currencyData.code',
        },
      },
    ]);

    return Lots;
  }

  public async getAvailableLots(user) {
    const Lots = await this.lotsModel.aggregate([
      {
        $match: {
          companyId: user.companyId,
          status: 'available',
        },
      },
      {
        $lookup: {
          from: `products`,
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: {
          path: '$product',
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
          productId: '$product._id',
          status: 1,
          expiryDate: 1,
          quantity: 1,
          serialNumber: 1,
          price: '$product.price',
          name: '$product.name',
          model: '$product.model',
          description: '$product.description',
          category: '$product.category',
          batchNotes: 1,
          vatRate: 1,
          currencyRate: 1,
          costPrice: 1,
          totalCostPrice: 1,
          lotNumber: 1,
          currency: '$currency.code',
        },
      },
    ]);

    return Lots;
  }

  public async createLots(lots) {
    const newLots = await this.lotsModel.insertMany(lots);

    return await newLots;
  }

  public async findLotsBySuppliesId(supplyId) {
    return await this.lotsModel.find({
      supplyId: new mongoose.Types.ObjectId(supplyId),
    });
  }

  public async deleteLotsBySuppliesId(supplyId): Promise<any> {
    return await this.lotsModel.deleteMany({
      supplyId: new mongoose.Types.ObjectId(supplyId),
    });
  }
}
