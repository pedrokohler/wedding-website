import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InvitationDocument = HydratedDocument<Invitation>;

@Schema()
export class Invitation {
  @Prop()
  name: string;

  @Prop()
  confirmed: boolean;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);
