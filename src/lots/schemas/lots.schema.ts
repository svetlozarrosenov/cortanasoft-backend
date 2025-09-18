import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LotsDocument = Lots & Document;

@Schema({ collection: 'lots', timestamps: true })
export class Lots extends Document {
  @Prop({ type: String, required: true, unique: true })
  lotNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'products', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'locations', required: true })
  locationId: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  quantity: number;

  @Prop({ type: Date })
  expiryDate: Date;

  @Prop({ type: String })
  serialNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'suppliers' })
  supplierId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'warehouses' })
  warehouseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'company' })
  companyId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['available', 'sold', 'expired', 'recalled'],
    default: 'available',
  })
  status: string;

  @Prop({ type: Number, min: 0 })
  costPrice: number;

  @Prop({ type: String })
  batchNotes: string;
}

export const LotsSchema = SchemaFactory.createForClass(Lots);
