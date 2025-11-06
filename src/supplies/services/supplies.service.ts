import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Supplies, SuppliesDocument } from '../schemas/supplies.schema';
import {
  Products,
  ProductsDocument,
} from 'src/products/schemas/products.schema';
import { LotsService } from 'src/lots/services/lots.service';

@Injectable()
export class SuppliesService {
  constructor(
    @InjectModel(Supplies.name) private suppliesModel: Model<SuppliesDocument>,
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
          $lookup: {
            from: `locations`,
            localField: 'locationId',
            foreignField: '_id',
            as: 'location',
          },
        },
        {
          $unwind: {
            path: '$location',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            totalPrice: 1,
            status: 1,
            currency: '$currency.code',
            currencyId: '$currency._id',
            deliveryDate: 1,
            products: 1,
            companyId: 1,
            locationId: 1,
            supplierId: 1,
            location: '$location.name',
            companyName: '$suppliers.companyName',
          },
        },
      ])
      .exec();

    return supplies;
  }

  public async createSupplies(createSuppliesDto, user) {
    const session = await this.suppliesModel.db.startSession();
    session.startTransaction();

    try {
      const newSupplies = new this.suppliesModel({
        ...createSuppliesDto,
        companyId: user.companyId,
      });

      await newSupplies.save({ session });

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
          locationId: createSuppliesDto.locationId
            ? new mongoose.Types.ObjectId(createSuppliesDto.locationId)
            : createSuppliesDto.locationId,
          currencyId: product.currencyId
            ? new mongoose.Types.ObjectId(product.currencyId)
            : product.currencyId,
          supplyId: newSupplies._id,
          companyId: user.companyId,
          lotNumber: product.lotNumber,
        };
      });

      // Предай сесията на lotsService, за да се използва в createLots
      await this.lotsService.createLots(lotsData, session);

      await session.commitTransaction();
      session.endSession();

      return newSupplies;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error; // Или обработи грешката по твой начин
    }
  }

  public async editSupply(id: string, updateSuppliesDto, user) {
    const supplies = await this.suppliesModel.findOne({
      _id: id,
      companyId: user.companyId,
    });
    if (!supplies) {
      throw new NotFoundException('Supplies not found');
    }

    const oldLots = await this.lotsService.findLotsBySuppliesId(id);
    console.log('crb_oldLots', oldLots);
    if (!oldLots.length || oldLots.some((lot) => lot.isUsed)) {
      throw new BadRequestException(
        'Cannot edit supplies: some lots are already used',
      );
    }

    const deletedLots = await this.lotsService.deleteLotsBySuppliesId(id);
    if (!deletedLots?.deletedCount) {
      throw new BadRequestException(`We couldn't delete the old lots!`);
    }

    const defaultLotNumber = `lot-${Date.now()}`;
    const newLotsData = updateSuppliesDto.products.map((product) => {
      return {
        ...product,
        productId: product.productId
          ? new mongoose.Types.ObjectId(product.productId)
          : product.productId,
        status: product.quantity >= 1 ? 'available' : 'sold',
        supplierId: updateSuppliesDto.supplierId
          ? new mongoose.Types.ObjectId(updateSuppliesDto.supplierId)
          : updateSuppliesDto.supplierId,
        locationId: updateSuppliesDto.locationId
          ? new mongoose.Types.ObjectId(updateSuppliesDto.locationId)
          : updateSuppliesDto.locationId,
        currencyId: product.currencyId
          ? new mongoose.Types.ObjectId(product.currencyId)
          : product.currencyId,
        supplyId: id ? new mongoose.Types.ObjectId(id) : id,
        companyId: user.companyId,
        lotNumber: product.lotNumber ? product.lotNumber : defaultLotNumber,
      };
    });

    await this.lotsService.createLots(newLotsData);

    const updatedSupplies = await this.suppliesModel.findByIdAndUpdate(
      id,
      updateSuppliesDto,
      { new: true },
    );

    return updatedSupplies;
  }
}
