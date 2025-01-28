import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VisitorDocument = HydratedDocument<Visitor>;

@Schema()
export class Visitor {
  @Prop()
  date: Date;
}

export const VisitorsSchema = SchemaFactory.createForClass(Visitor);
