import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { GiftsModule } from './gifts/gifts.module';
import { GuestsModule } from './guests/guests.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagesModule,
    GiftsModule,
    GuestsModule,
    TelegramBotModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING ?? ''),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
