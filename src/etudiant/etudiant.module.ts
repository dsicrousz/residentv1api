import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Etudiant, EtudiantSchema } from './entities/etudiant.entity';
import { CaslModule } from 'src/casl/casl.module';
import { InscriptionModule } from 'src/inscription/inscription.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Etudiant.name, schema: EtudiantSchema}],"etudiant"),CaslModule,
  InscriptionModule
],
  controllers: [EtudiantController],
  providers: [EtudiantService],
  exports: [EtudiantService]
})
export class EtudiantModule {}
