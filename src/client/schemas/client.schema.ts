import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type ClientDocument = Client & Document;

@Schema({ collection: 'clients', timestamps: true })
export class Client {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String })
  middleName: string;

  @Prop({ type: String })
  lastName: string;

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

  @Prop({ type: String })
  egn: string;

  @Prop({ type: String })
  vat: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'company' })
  companyId: ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
