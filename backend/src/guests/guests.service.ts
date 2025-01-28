import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guest } from 'src/schemas/guest.schema';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';
export type GuestDto = {
  name: string;
  plusOne?: string;
  children?: number;
  phone: string;
};

@Injectable()
export class GuestsService {
  private telegramNotificationChannelId: string;
  constructor(
    private readonly telegramBotService: TelegramBotService,
    @InjectModel(Guest.name) private guestModel: Model<Guest>,
    private readonly configService: ConfigService,
  ) {
    this.telegramNotificationChannelId = this.configService.get<string>(
      'TELEGRAM_NOTIFICATION_CHANNEL_ID',
      '',
    );
  }

  async saveGuest(guest: GuestDto) {
    const createdGuest = new this.guestModel(guest);
    return createdGuest.save();
  }

  async sendConfirmationToGroup(guest: GuestDto): Promise<void> {
    const total = 1 + (guest.plusOne?.length ? 1 : 0) + (guest.children ?? 0);
    await this.telegramBotService.sendMessage({
      chatId: this.telegramNotificationChannelId,
      text: `
Nova confirmação recebida
#Nome:
    ${guest.name}
#Acompanhante:
    ${guest.plusOne}
#Crianças:
    ${guest.children ?? 0}
#Total:
    ${total}
#Telefone:
    ${guest.phone}`,
    });
  }
}
