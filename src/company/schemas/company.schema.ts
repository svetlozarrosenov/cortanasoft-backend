import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ collection: 'company', timestamps: true })
export class Company {
  @Prop({})
  name: string;

  @Prop({})
  personInCharge: string;

  @Prop({})
  vatNumber: number;

  @Prop({})
  eik: number;

  @Prop({})
  country: string;

  @Prop({})
  city: string;

  @Prop({})
  address: string;

  @Prop({})
  email: string;

  @Prop({})
  phone: string;

  @Prop({})
  description: string;

  @Prop({})
  industry: string;

  @Prop({})
  price: string;

  //monthly or yearly
  @Prop({})
  charging: string;

  @Prop({ default: 'client' })
  roleInTheSystem: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
