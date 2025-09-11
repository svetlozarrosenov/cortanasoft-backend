import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
  ) {}

  public async updateProduct(_id, productData, user) {
    return await this.productsModel.updateOne(
      { _id, companyId: user.companyId },
      { ...productData },
    );
  }

  public async getProducts(user) {
    const products = await this.productsModel.aggregate([
      // Match products by companyId
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(user.companyId),
        },
      },
      // Lookup to Lots, filtering only available lots
      {
        $lookup: {
          from: 'lots',
          let: { productId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$productId', '$$productId'] },
                    { $eq: ['$status', 'available'] },
                  ],
                },
              },
            },
          ],
          as: 'lots',
        },
      },
      // Calculate totalQuantity by summing quantity from lots
      {
        $addFields: {
          quantity: {
            $sum: '$lots.quantity',
          },
        },
      },
      // Remove the lots field
      {
        $unset: ['lots'],
      },
      // Optionally project specific fields (all fields are included by default)
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          category: 1,
          companyId: 1,
          quantity: 1,
        },
      },
    ]);

    return products;
  }

  public async createProduct(createProductDto: CreateProductDto, user) {
    const newProduct = new this.productsModel({
      ...createProductDto,
      companyId: user.companyId,
    });

    return await newProduct.save();
  }
}
