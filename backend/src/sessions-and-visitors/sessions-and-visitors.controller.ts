import { Controller, Get, Post } from '@nestjs/common';
import { SessionsAndVisitorsService } from './sessions-and-visitors.service';

@Controller()
export class SessionsAndVisitorsController {
  constructor(
    private readonly sessionsAndVisitorsService: SessionsAndVisitorsService,
  ) {}

  @Get('/unique-sessions/count')
  getUniqueSessionsCount(): Promise<unknown> {
    return this.sessionsAndVisitorsService.getSessionsCount();
  }

  @Post('/unique-sessions/count')
  incrementSessions(): Promise<unknown> {
    const date = new Date();
    return this.sessionsAndVisitorsService.saveSession(date);
  }

  @Post('/unique-visitors/count')
  incrementVisitors(): Promise<unknown> {
    const date = new Date();
    return this.sessionsAndVisitorsService.saveVisitor(date);
  }
}
