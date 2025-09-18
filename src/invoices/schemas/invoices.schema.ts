import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type InvoicesDocument = Invoices & Document;

@Schema({ collection: 'invoices', timestamps: true })
export class Invoices {
  @Prop({ type: String, required: true, unique: true })
  invoiceNumber: string; // Уникален номер на фактурата (напр. FAK-123456-789123)

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Clients', required: true })
  clientId: ObjectId; // Връзка към клиента

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company', required: true })
  companyId: ObjectId; // Връзка към фирмата (доставчик)

  @Prop({
    type: [
      {
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true }, // Цена без ДДС
        totalPrice: { type: Number, required: true }, // Количество * Цена без ДДС
      },
    ],
    required: true,
  })
  products: Array<{
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>; // Списък с продукти/услуги

  @Prop({ type: Number, required: true })
  subtotal: number; // Данъчна основа (обща сума без ДДС)

  @Prop({ type: Number, required: true, default: 0.2 })
  vatRate: number; // ДДС ставка (по подразбиране 20% за България)

  @Prop({ type: Number, required: true })
  vatAmount: number; // Сума на ДДС

  @Prop({ type: Number, required: true })
  totalWithVAT: number; // Обща сума с ДДС

  @Prop({ type: Date, required: true, default: Date.now })
  issueDate: Date; // Дата на издаване

  @Prop({ type: Date, required: true })
  taxEventDate: Date; // Дата на данъчно събитие

  @Prop({
    type: String,
    enum: ['pending', 'paid', 'canceled'],
    default: 'pending',
  })
  status: string; // Статус на фактурата

  @Prop({ type: String })
  paymentMethod: string; // Начин на плащане (напр. "По банков път")

  @Prop({ type: Date })
  dueDate: Date; // Падеж на плащане

  @Prop({ type: String })
  description: string; // Описание (запазено от оригиналната схема)

  @Prop({ type: String })
  placeOfTransaction: string; // Място на сделката (напр. "София, България")
}

export const InvoicesSchema = SchemaFactory.createForClass(Invoices);
