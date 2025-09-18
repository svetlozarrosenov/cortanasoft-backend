import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type SuppliersDocument = Suppliers & Document;

@Schema({ collection: 'suppliers', timestamps: true })
export class Suppliers {
  @Prop({ type: String, required: true })
  companyName: string;

  @Prop({ type: String })
  responsiblePerson: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;
}

export const SuppliersSchema = SchemaFactory.createForClass(Suppliers);
