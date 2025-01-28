import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';

export type MessageDto = {
  message: string;
  name: string;
};

@Injectable()
export class MessagesService {
  private telegramNotificationChannelId: string;
  constructor(
    private readonly telegramBotService: TelegramBotService,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private readonly configService: ConfigService,
  ) {
    this.telegramNotificationChannelId = this.configService.get<string>(
      'TELEGRAM_NOTIFICATION_CHANNEL_ID',
      '',
    );
  }

  async saveMessage(message: MessageDto) {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }

  async sendMessageToGroup(message: MessageDto) {
    await this.telegramBotService.sendMessage({
      chatId: this.telegramNotificationChannelId,
      text: `
Nova mensagem recebida
#Nome:
    ${message.name}

#Mensagem:
    ${message.message}`,
    });
  }
}
