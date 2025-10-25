import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { SupplyProductSchema } from './supply-product.schema';

export type SuppliesDocument = Supplies & Document;

export interface SupplyProductInterface {
  quantity: number;
  costPrice: number;
  totalCostPrice: number;
  currencyId: string;
  currencyRate: number;
  productId: string;
  vatRate: number;
}

@Schema({ collection: 'supplies', timestamps: true })
export class Supplies {
  @Prop({ type: Array<SupplyProductSchema> })
  products: [SupplyProductSchema];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'suppliers' })
  supplierId: ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'locations',
    required: true,
  })
  locationId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;

  @Prop({ required: true, type: Number })
  totalPrice: number;

  @Prop({ required: true, type: String })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'currency' })
  currencyId: ObjectId;

  @Prop({ required: true, type: Date })
  deliveryDate: Date;
}

export const SuppliesSchema = SchemaFactory.createForClass(Supplies);
