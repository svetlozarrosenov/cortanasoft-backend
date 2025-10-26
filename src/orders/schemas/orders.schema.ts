import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';
import { LotSchema } from './lot.schema';

export type OrdersDocument = Orders & Document;

@Schema({ collection: 'orders', timestamps: true })
export class Orders {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'clients', required: true })
  clientId: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  creator: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company', required: true })
  companyId: ObjectId;

  @Prop({ type: Array<LotSchema> })
  lots: [LotSchema];

  @Prop({ required: true, min: 0 })
  totalPrice: number;

  @Prop({
    required: true,
    enum: ['pending', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  })
  status: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
