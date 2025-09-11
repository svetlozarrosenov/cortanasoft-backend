import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactMessagesDocument = ContactMessages & Document;

@Schema({ collection: 'contactMessages', timestamps: true }) // Добавено timestamps: true
export class ContactMessages {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;
}

export const ContactMessagesSchema =
  SchemaFactory.createForClass(ContactMessages);
