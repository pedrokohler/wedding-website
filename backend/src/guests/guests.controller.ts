import { Body, Controller, Post } from '@nestjs/common';
import { GuestDto, GuestsService } from './guests.service';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}
  @Post()
  async createGuest(@Body() guestDto: GuestDto) {
    await this.guestsService.sendConfirmationToGroup(guestDto);
    const savesGuest = await this.guestsService.saveGuest(guestDto);
    return savesGuest;
  }
}
