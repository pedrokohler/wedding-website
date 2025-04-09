import { Module } from '@nestjs/common';
import { GuestsController } from './guests.controller';
import { GuestsService } from './guests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Guest, GuestSchema } from 'src/schemas/guest.schema';
import { Invitation, InvitationSchema } from 'src/schemas/invititations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
    ]),
  ],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class GuestsModule {}
