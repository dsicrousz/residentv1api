import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionEtudiantSchema } from './entities/session-etudiant.entity';
import { SessionEtudiantController } from './session-etudiant.controller';
import { SessionEtudiantService } from './session-etudiant.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Session.name, schema: SessionEtudiantSchema}],'etudiant')],
  controllers: [SessionEtudiantController],
  providers: [SessionEtudiantService],
  exports:[SessionEtudiantService]
})
export class SessionEtudiantModule {}