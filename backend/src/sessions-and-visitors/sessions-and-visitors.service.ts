import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/schemas/sessions.schema';
import { Visitor } from 'src/schemas/visitors.schema';

export type SessionCountDto = {
  uniqueSessionsCount: number;
};

@Injectable()
export class SessionsAndVisitorsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
    @InjectModel(Visitor.name) private visitorModel: Model<Visitor>,
  ) {}

  saveSession(date: Date): Promise<Session> {
    const createdSession = new this.sessionModel({ date });
    return createdSession.save();
  }

  saveVisitor(date: Date): Promise<Visitor> {
    const createVisitor = new this.visitorModel({ date });
    return createVisitor.save();
  }

  async getSessionsCount(): Promise<SessionCountDto> {
    const sessionsCount = await this.sessionModel.countDocuments();
    return { uniqueSessionsCount: sessionsCount };
  }
}
