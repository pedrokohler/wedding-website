import { forwardRef, Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { GiftsModule } from 'src/gifts/gifts.module';

@Module({
  imports: [forwardRef(() => GiftsModule)],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
