import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema({ collection: 'products', timestamps: true })
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  model: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'products-categories' })
  categoryId: ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
