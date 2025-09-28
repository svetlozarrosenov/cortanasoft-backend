import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactMessagesDocument = ContactMessages & Document;

@Schema({ collection: 'contactMessages', timestamps: true }) // Добавено timestamps: true
export class ContactMessages {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  message: string;
}

export const ContactMessagesSchema =
  SchemaFactory.createForClass(ContactMessages);
