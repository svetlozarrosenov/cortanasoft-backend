import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-products.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/products.schema';
import mongoose, { Model } from 'mongoose';
import {
  ProductsCategories,
  ProductsCategoriesDocument,
} from './schemas/product-category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: Model<ProductsDocument>,
    @InjectModel(ProductsCategories.name)
    private productsCategoriesModel: Model<ProductsCategoriesDocument>,
  ) {}

  public async updateProduct(_id, productData, user) {
    return await this.productsModel.updateOne(
      { _id, companyId: user.companyId },
      { ...productData },
    );
  }

  public async getProducts(user) {
    const products = await this.productsModel.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(user.companyId),
        },
      },
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
      {
        $addFields: {
          quantity: {
            $sum: '$lots.quantity',
          },
        },
      },
      {
        $unset: ['lots'],
      },
      {
        $lookup: {
          from: `products-categories`,
          localField: 'categoryId',
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
        $project: {
          _id: 1,
          name: 1,
          model: 1,
          description: 1,
          price: 1,
          categoryId: 1,
          category: '$categories.name',
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

  public async getProductsCategories(user) {
    return await this.productsCategoriesModel.find({
      companyId: user.companyId,
    });
  }

  public async createProductCategory(createProductCategoryDto: any, user) {
    const newProductCategory = new this.productsCategoriesModel({
      ...createProductCategoryDto,
      companyId: user.companyId,
    });

    return await newProductCategory.save();
  }

  public async updateProductCategory(_id, productCategoryData, user) {
    return await this.productsCategoriesModel.updateOne(
      { _id, companyId: user.companyId },
      { ...productCategoryData },
    );
  }
}
