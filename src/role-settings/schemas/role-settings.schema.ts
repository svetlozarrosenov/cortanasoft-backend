import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleSettingsDocument = RoleSettings & Document;

@Schema({ collection: 'role_settings' })
export class RoleSettings {
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
}

export const RoleSettingsSchema = SchemaFactory.createForClass(RoleSettings);
