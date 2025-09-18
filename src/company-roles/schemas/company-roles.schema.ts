import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type CompanyRolesDocument = CompanyRoles & Document;

@Schema({ collection: 'company-roles', timestamps: true })
export class CompanyRoles {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const CompanyRolesSchema = SchemaFactory.createForClass(CompanyRoles);
