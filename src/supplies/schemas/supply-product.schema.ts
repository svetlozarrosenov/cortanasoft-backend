import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class SupplyProductSchema {
  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  costPrice: number;

  @Prop({ required: true, type: Number })
  totalCostPrice: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'currency' })
  currencyId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  currencyRate: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'products' })
  productId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  vatRate: number;

  @Prop({ type: String })
  serialNumber: string;

  @Prop({ type: Date })
  expiryDate: Date;
}
