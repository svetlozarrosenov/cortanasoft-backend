import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class LotSchema {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  model: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  salePrice: number;

  @Prop({ required: true, type: Number })
  totalSalePrice: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'currency' })
  currencyId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  currencyRate: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'lots' })
  lotId: Types.ObjectId;

  @Prop({ required: true, type: Number })
  vatRate: number;

  @Prop({ type: String })
  serialNumber: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'products' })
  productId: Types.ObjectId;

  @Prop({ type: Date })
  expiryDate: Date;
}
