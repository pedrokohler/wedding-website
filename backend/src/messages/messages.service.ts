import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/message.schema';

export type MessageDto = {
  message: string;
  name: string;
};

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async saveMessage(message: MessageDto) {
    const createdMessage = new this.messageModel(message);
    return createdMessage.save();
  }
}
