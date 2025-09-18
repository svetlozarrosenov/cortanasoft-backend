import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Invoices,
  InvoicesDocument,
} from 'src/invoices/schemas/invoices.schema';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoices.name) private invoicesModel: Model<InvoicesDocument>,
  ) {}

  public async getAllInvoices(user) {
    const Invoicess = await this.invoicesModel
      .find({
        companyId: user.companyId,
      })
      .exec();
    return Invoicess;
  }

  public async createInvoice(createInvoicesDto, user) {
    const newInvoices = new this.invoicesModel({
      ...createInvoicesDto,
      companyId: user.companyId,
    });

    return await newInvoices.save();
  }

  public async updateInvoice(_id, rolesData, user) {
    return await this.invoicesModel.updateOne(
      { _id, companyId: user.companyId },
      {
        ...rolesData,
      },
    );
  }
}
