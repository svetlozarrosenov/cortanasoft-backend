import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema({ collection: 'products', timestamps: true })
export class Products {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  model: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'products-categories' })
  categoryId: ObjectId;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Number, required: true })
  salePrice: number;

  @Prop({ type: Number, required: true })
  costPrice: number;

  @Prop({ type: Number, required: true })
  vat: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
