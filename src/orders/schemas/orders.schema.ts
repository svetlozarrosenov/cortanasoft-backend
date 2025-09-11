import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type OrdersDocument = Orders & Document;

@Schema({ collection: 'orders', timestamps: true })
export class Orders {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'clients', required: true })
  clientId: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  creator: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company', required: true })
  companyId: ObjectId;

  @Prop({
    type: [
      {
        productId: { type: MongooseSchema.Types.ObjectId, ref: 'products' },
        quantity: Number,
      },
    ],
    required: true,
    validate: {
      validator: (products: Array<{ productId: string; quantity: number }>) =>
        products.length > 0 &&
        products.every((p) => p.productId && p.quantity > 0),
      message:
        'Поръчката трябва да съдържа поне един продукт с валидно ID и количество',
    },
  })
  products: Array<{ productId: string; quantity: number }>;

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
