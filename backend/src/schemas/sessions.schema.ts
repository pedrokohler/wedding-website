import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ default: Date.UTC(Date.now()) })
  date: Date;
}

export const SessionsSchema = SchemaFactory.createForClass(Session);
