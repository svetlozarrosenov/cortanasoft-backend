import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, CurrencyDocument } from '../schemas/currency.schema';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency.name) private currencysModel: Model<CurrencyDocument>,
  ) {}

  public async getAllCurrencies(user) {
    const clients = await this.currencysModel.find({}).exec();
    return clients;
  }
}
