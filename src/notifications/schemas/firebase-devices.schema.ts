import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, ObjectId } from 'mongoose';

export type FirebaseDevicesDocument = FirebaseDevices & Document;

@Schema({ collection: 'firebaseDevices' })
export class FirebaseDevices {
  @Prop({ required: true, type: MongooseSchema.Types.ObjectId })
  userId: ObjectId;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true, unique: true })
  firebaseDeviceId: string;
}

export const FirebaseDevicesSchema =
  SchemaFactory.createForClass(FirebaseDevices);
