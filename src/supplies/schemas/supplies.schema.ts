import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type SuppliesDocument = Supplies & Document;

@Schema({ collection: 'supplies', timestamps: true })
export class Supplies {
  @Prop({ type: Array<MongooseSchema.Types.ObjectId> })
  products: [ObjectId];

  @Prop({ type: MongooseSchema.Types.ObjectId })
  supplierId: ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'locations',
    required: true,
  })
  locationId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ required: true, type: String })
  status: string;

  @Prop({ required: true, type: String })
  currency: string;

  @Prop({ required: true, type: Date })
  deliveryDate: Date;
}

export const SuppliesSchema = SchemaFactory.createForClass(Supplies);
