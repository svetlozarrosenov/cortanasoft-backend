import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDocument } from './schemas/orders.schema';
import mongoose, { Model } from 'mongoose';
import { Lots, LotsDocument } from 'src/lots/schemas/lots.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>,
    @InjectModel(Lots.name) private lotsModel: Model<LotsDocument>,
  ) {}

  async getAllOrders(user: any) {
    const orders = await this.ordersModel
      .aggregate([
        {
          $match: {
            companyId: user.companyId,
          },
        },
        {
          $lookup: {
            from: `clients`,
            localField: 'clientId',
            foreignField: '_id',
            as: 'client',
          },
        },
        {
          $unwind: {
            path: '$client',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: `products`,
            localField: 'products.productId',
            foreignField: '_id',
            as: 'foundedProduct',
          },
        },
        {
          $unwind: {
            path: '$products',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            clientId: { $first: '$clientId' },
            client: { $first: '$client' },
            products: {
              $push: {
                productId: '$products.productId',
                quantity: '$products.quantity',
                productDetails: {
                  $arrayElemAt: ['$foundedProduct', 0],
                },
              },
            },
            totalPrice: { $first: '$totalPrice' },
            status: { $first: '$status' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        {
          $project: {
            _id: 1,
            clientId: 1,
            clientEmail: '$client.email',
            clientName: {
              $concat: [
                '$client.firstName',
                ' ',
                { $ifNull: ['$client.lastName', ''] },
              ],
            },
            products: {
              $map: {
                input: '$products',
                as: 'prod',
                in: {
                  productId: '$$prod.productId',
                  quantity: '$$prod.quantity',
                  productName: '$$prod.productDetails.name',
                  productPrice: '$$prod.productDetails.price',
                },
              },
            },
            totalPrice: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
      .exec();

    return orders;
  }

  async getRevenue(user: any) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );

    const orders = await this.ordersModel
      .aggregate([
        {
          $match: {
            companyId: user.companyId,
            createdAt: {
              $gte: startOfMonth,
              $lte: endOfMonth,
            },
          },
        },
        {
          $project: {
            _id: 1,
            clientId: 1,
            clientEmail: '$client.email',
            clientName: {
              $concat: [
                '$client.firstName',
                ' ',
                { $ifNull: ['$client.lastName', ''] },
              ],
            },
            products: {
              $map: {
                input: '$products',
                as: 'prod',
                in: {
                  productId: '$$prod.productId',
                  quantity: '$$prod.quantity',
                  productName: '$$prod.productDetails.name',
                  productPrice: '$$prod.productDetails.price',
                },
              },
            },
            totalPrice: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $group: {
            _id: null,
            orders: { $push: '$$ROOT' },
            totalRevenue: { $sum: '$totalPrice' },
          },
        },
      ])
      .exec();

    return {
      orders: orders[0]?.orders || [],
      totalRevenue: orders[0]?.totalRevenue || 0,
    };
  }

  async getActiveOrders(user: any) {
    const orders = await this.ordersModel
      .aggregate([
        {
          $match: {
            companyId: user.companyId,
            status: { $nin: ['delivered', 'canceled'] },
          },
        },
        {
          $lookup: {
            from: `clients`,
            localField: 'clientId',
            foreignField: '_id',
            as: 'client',
          },
        },
        {
          $unwind: {
            path: '$client',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: `products`,
            localField: 'products.productId',
            foreignField: '_id',
            as: 'foundedProduct',
          },
        },
        {
          $unwind: {
            path: '$products',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            clientId: { $first: '$clientId' },
            client: { $first: '$client' },
            products: {
              $push: {
                productId: '$products.productId',
                quantity: '$products.quantity',
                productDetails: {
                  $arrayElemAt: ['$foundedProduct', 0],
                },
              },
            },
            totalPrice: { $first: '$totalPrice' },
            status: { $first: '$status' },
            createdAt: { $first: '$createdAt' },
            updatedAt: { $first: '$updatedAt' },
          },
        },
        {
          $project: {
            _id: 1,
            clientId: 1,
            clientEmail: '$client.email',
            clientName: {
              $concat: [
                '$client.firstName',
                ' ',
                { $ifNull: ['$client.lastName', ''] },
              ],
            },
            products: {
              $map: {
                input: '$products',
                as: 'prod',
                in: {
                  productId: '$$prod.productId',
                  quantity: '$$prod.quantity',
                  productName: '$$prod.productDetails.name',
                  productPrice: '$$prod.productDetails.price',
                },
              },
            },
            totalPrice: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
      .exec();

    return orders;
  }

  public async create(user, order) {
    console.log('crb_order', order);
    const newOrder = await this.ordersModel.insertMany({
      ...order,
      creator: user.userId,
      companyId: user.companyId,
    });

    console.log('crb_prd', order);
    const lotsForUpdate = order.products.map((prd) =>
      this.lotsModel.updateOne(
        {
          _id: new mongoose.Types.ObjectId(prd.lotId),
          companyId: user.companyId,
        },
        { $inc: { quantity: -prd.quantity } },
      ),
    );
    await Promise.all(lotsForUpdate);

    await this.lotsModel.updateOne(
      { companyId: user.companyId, status: 'available', quantity: 0 },
      { $set: { status: 'sold' } },
    );

    return newOrder;
  }
}
