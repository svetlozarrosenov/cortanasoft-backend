import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CurrencyDocument = Currency & Document;

@Schema({ collection: 'currency', timestamps: true })
export class Currency {
  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: Number, required: true })
  trade_share: number;
}

export const CurrencySchema = SchemaFactory.createForClass(Currency);
