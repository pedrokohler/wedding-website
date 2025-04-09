import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Guest } from 'src/schemas/guest.schema';
import { Invitation } from 'src/schemas/invititations.schema';
export type GuestDto = {
  name: string;
  plusOne?: string;
  children?: number;
  phone: string;
};

@Injectable()
export class GuestsService {
  constructor(
    @InjectModel(Guest.name) private guestModel: Model<Guest>,
    @InjectModel(Invitation.name) private invitationModel: Model<Invitation>,
  ) {}

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
      { name: guest.name + 'confirmado' },
    );
  }

  generalizeString(str: string) {
    return str
      .replace(/a/g, '[a,á,à,ä,â]')
      .replace(/A/g, '[A,A,Á,À,Ä,Â]')
      .replace(/e/g, '[e,é,ë,è]')
      .replace(/E/g, '[E,E,É,Ë,È]')
      .replace(/i/g, '[i,í,ï,ì]')
      .replace(/I/g, '[I,I,Í,Ï,Ì]')
      .replace(/o/g, '[o,ó,ö,ò]')
      .replace(/O/g, '[O,O,Ó,Ö,Ò]')
      .replace(/u/g, '[u,ü,ú,ù]')
      .replace(/U/g, '[U,U,Ü,Ú,Ù]')
      .replace(/c/g, '[c,ç]')
      .replace(/C/g, '[C,Ç]');
  }

  stripDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  normalizeString(str: string): string {
    return this.generalizeString(this.stripDiacritics(str));
  }

  async getInvitations(filter: string) {
    const regex = new RegExp(this.normalizeString(filter), 'ig');
    const matchedInvitations = await this.invitationModel
      .find({
        name: regex,
      })
      .limit(10);
    return matchedInvitations;
  }
}
