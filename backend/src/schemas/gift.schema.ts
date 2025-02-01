import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GiftDocument = HydratedDocument<Gift>;

@Schema()
export class Gift {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  searchTerm: string;

  @Prop()
  description: string;

  @Prop()
  priceInCents: number;

  @Prop()
  imageUrl: string;

  @Prop()
  productUrl: string;

  @Prop()
  isActive: boolean;

  @Prop({ type: 'double' })
  manualOrdering: number;
}

export const GiftSchema = SchemaFactory.createForClass(Gift);
