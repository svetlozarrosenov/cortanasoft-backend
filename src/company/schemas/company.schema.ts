import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CompanyRolesEnum } from 'src/company-roles/constants';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ collection: 'company', timestamps: true })
export class Company {
  @Prop({})
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
  personInChargeId: ObjectId;

  @Prop({ type: String })
  vatNumber: string;

  @Prop({ type: Number })
  eik: number;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  industry: string;

  @Prop({ type: String })
  price: string;

  //monthly or yearly
  @Prop({ type: String })
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
