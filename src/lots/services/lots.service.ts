import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        $project: {
          productDetails: '$product',
          status: 1,
          expiryDate: 1,
          quantity: 1,
          serialNumber: 1,
          price: '$product.price',
          name: '$product.name',
          description: '$product.description',
          category: '$product.category',
          batchNotes: 1,
          lotNumber: 1,
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
        $project: {
          productId: '$product._id',
          status: 1,
          expiryDate: 1,
          quantity: 1,
          serialNumber: 1,
          price: '$product.price',
          name: '$product.name',
          description: '$product.description',
          category: '$product.category',
          batchNotes: 1,
          lotNumber: 1,
        },
      },
    ]);

    return Lots;
  }

  public async createLots(lots) {
    const newLots = await this.lotsModel.insertMany(lots);

    return await newLots;
  }
}
