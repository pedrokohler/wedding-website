import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guest } from 'src/schemas/guest.schema';
import { Invitation } from 'src/schemas/invititations.schema';
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
    @InjectModel(Invitation.name) private invitationModel: Model<Invitation>,
    private readonly configService: ConfigService,
  ) {
    this.telegramNotificationChannelId = this.configService.get<string>(
      'TELEGRAM_NOTIFICATION_CHANNEL_ID',
      '',
    );
  }

  async handleSaveGuest(guest: GuestDto) {
    const correspondingInvitation = await this.invitationModel.findOne({
      name: guest.name,
    });
    if (!correspondingInvitation) {
      throw new ForbiddenException(
        'Nome não encontrado na lista de convidados.',
      );
    }

    if (correspondingInvitation.confirmed) {
      throw new ForbiddenException(
        'Sua presença já tinha sido confirmada previamente!',
      );
    }
    const createdGuest = new this.guestModel(guest);
    await createdGuest.save();

    await this.invitationModel.updateOne(
      {
        name: guest.name,
      },
      { confirmed: true },
    );
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

  async getInvitations(filter: string) {
    const regex = new RegExp(filter, 'ig');
    const matchedInvitations = await this.invitationModel
      .find({
        name: regex,
        confirmed: false,
      })
      .limit(10);
    return matchedInvitations;
  }
}
