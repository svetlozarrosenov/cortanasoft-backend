import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Orders, OrdersDocument } from './schemas/orders.schema';
import mongoose, { Model } from 'mongoose';
import { Lots, LotsDocument } from 'src/lots/schemas/lots.schema';
import {
  Supplies,
  SuppliesDocument,
} from 'src/supplies/schemas/supplies.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name) private ordersModel: Model<OrdersDocument>,
    @InjectModel(Lots.name) private lotsModel: Model<LotsDocument>,
    @InjectModel(Supplies.name) private suppliesModel: Model<SuppliesDocument>,
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
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 0, 23, 59, 59, 999);

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

    const monthlyExpensesAgg = [
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
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ];
    const monthlyExpenses = await this.suppliesModel
      .aggregate(monthlyExpensesAgg)
      .exec();

    const yearlyExpensesAgg = [
      {
        $match: {
          companyId: user.companyId,
          createdAt: {
            $gte: startOfYear,
            $lte: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ];
    const yearlyExpenses = await this.suppliesModel
      .aggregate(yearlyExpensesAgg)
      .exec();

    return {
      orders: orders[0]?.orders || [],
      totalRevenue: orders[0]?.totalRevenue || 0,
      expenses: {
        monthly: monthlyExpenses[0]?.total || 0,
        yearly: yearlyExpenses[0]?.total || 0,
      },
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

  public async create(user: any, order: any) {
    let newOrder: any = null;

    try {
      newOrder = await this.ordersModel.create([
        {
          ...order,
          creator: user.userId,
          companyId: user.companyId,
        },
      ]);

      console.log('crb_order', order);
      const lotsForUpdate = order.lots.map((prd: any) =>
        this.lotsModel.updateOne(
          {
            _id: new mongoose.Types.ObjectId(prd.lotId),
            companyId: user.companyId,
          },
          { $inc: { quantity: -prd.quantity }, $set: { isUsed: true } },
        ),
      );

      const results = await Promise.all(lotsForUpdate);

      const allSuccessful = results.every((r: any) => r.matchedCount > 0);
      if (!allSuccessful) {
        throw new Error('Не всички lot-ове са обновени');
      }

      await this.lotsModel.updateOne(
        { companyId: user.companyId, status: 'available', quantity: 0 },
        { $set: { status: 'sold' } },
      );

      return newOrder[0];
    } catch (error) {
      if (newOrder && newOrder[0]?._id) {
        await this.ordersModel.deleteOne({ _id: newOrder[0]._id });
        console.log('Order изтрит поради грешка в lot-овете');
      }
      console.error('Грешка при създаване на поръчка:', error);
      throw new Error(
        'Неуспешно създаване на поръчка – lot-овете не са актуализирани.',
      );
    }
  }
}
