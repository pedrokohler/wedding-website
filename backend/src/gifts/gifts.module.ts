import { forwardRef, Module } from '@nestjs/common';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Gift, GiftSchema } from 'src/schemas/gift.schema';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';

@Module({
  imports: [
    forwardRef(() => TelegramBotModule),
    MongooseModule.forFeature([{ name: Gift.name, schema: GiftSchema }]),
  ],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
