import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type LocationsDocument = Locations & Document;

@Schema({ collection: 'locations', timestamps: true })
export class Locations {
  @Prop({})
  name: string;

  @Prop({})
  address: string;

  @Prop({})
  type: string;

  @Prop({})
  country: string;

  @Prop({})
  city: string;

  @Prop({})
  email: string;

  @Prop({})
  phone: string;

  @Prop({})
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  companyId: ObjectId;
}

export const LocationsSchema = SchemaFactory.createForClass(Locations);
