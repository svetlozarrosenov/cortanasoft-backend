import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyRolesEnum } from 'src/company-roles/constants';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ collection: 'company', timestamps: true })
export class Company {
  @Prop({})
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
  personInCharge: ObjectId;

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

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    default: CompanyRolesEnum.clientCompanyRoleId,
  })
  roleId: ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'currency' })
  currencyId: ObjectId;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
