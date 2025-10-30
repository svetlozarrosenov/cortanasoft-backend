import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type ProductsCategoriesDocument = ProductsCategories & Document;

@Schema({ collection: 'products-categories', timestamps: true })
export class ProductsCategories {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;
}

export const ProductsCategoriesSchema =
  SchemaFactory.createForClass(ProductsCategories);
