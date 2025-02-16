import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GuestDto, GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}
  @Post()
  async createGuest(@Body() guestDto: GuestDto) {
    const savesGuest = await this.guestsService.handleSaveGuest(guestDto);
    await this.guestsService.sendConfirmationToGroup(guestDto);
    return savesGuest;
  }

  @Get('invitations')
  async getInvitations(@Query('name') name: string) {
    return this.guestsService.getInvitations(name);
  }

  // @Get('invitations-create')
  // async getInvitationsCreate() {
  //   return this.guestsService.createInvitations();
  // }
}
