import { Module } from '@nestjs/common';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Gift, GiftSchema } from 'src/schemas/gift.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Gift.name, schema: GiftSchema }]),
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
