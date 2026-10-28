import { Module } from '@nestjs/common';
import { SelectionneService } from './selectionne.service';
import { SelectionneController } from './selectionne.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Selectionne, SelectionneSchema } from './entities/selectionne.entity';
import { InscriptionModule } from 'src/inscription/inscription.module';
import { AnneeParametreModule } from 'src/annee_parametre/annee_parametre.module';
import { DossierModule } from 'src/dossier/dossier.module';
import { FormationModule } from 'src/formation/formation.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Selectionne.name, schema: SelectionneSchema}],'resident'),InscriptionModule,
AnneeParametreModule,
DossierModule,
FormationModule
],
  controllers: [SelectionneController],
  providers: [SelectionneService]
})
export class SelectionneModule {}
