import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Visitor, VisitorsSchema } from 'src/schemas/visitors.schema';
import { Session, SessionsSchema } from 'src/schemas/sessions.schema';
import { SessionsAndVisitorsService } from './sessions-and-visitors.service';
import { SessionsAndVisitorsController } from './sessions-and-visitors.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Visitor.name, schema: VisitorsSchema },
      { name: Session.name, schema: SessionsSchema },
    ]),
  ],
  controllers: [SessionsAndVisitorsController],
  providers: [SessionsAndVisitorsService],
})
export class SessionsAndVisitorsModule {}
