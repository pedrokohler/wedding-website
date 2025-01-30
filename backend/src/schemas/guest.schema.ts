import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GuestDocument = HydratedDocument<Guest>;

@Schema()
export class Guest {
  @Prop()
  name: string;

  @Prop()
  plusOne?: string;

  @Prop()
  children?: number;

  @Prop()
  phone: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
