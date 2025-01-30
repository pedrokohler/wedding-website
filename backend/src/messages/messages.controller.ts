import { Body, Controller, Post } from '@nestjs/common';
import { MessageDto, MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() messageDto: MessageDto) {
    await this.messagesService.sendMessageToGroup(messageDto);
    const savedMessage = await this.messagesService.saveMessage(messageDto);
    return savedMessage;
  }
}
