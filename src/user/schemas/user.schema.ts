import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  @Prop()
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  lastName: string;

  @Prop({})
  role: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({})
  firebaseUserIds: string | null;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  companyId: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
