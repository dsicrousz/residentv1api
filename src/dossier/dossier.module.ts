import { Module } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { DossierController } from './dossier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dossier, DossierSchema } from './entities/dossier.entity';
import { CaslModule } from 'src/casl/casl.module';
import { EtudiantModule } from 'src/etudiant/etudiant.module';
import { SocialNumberGeneratorModule } from 'src/social-number-generator/social-number-generator.module';
@Module({
  controllers: [DossierController],
  providers: [DossierService],
  imports:[MongooseModule.forFeatureAsync([{name:Dossier.name,useFactory:()=> {
    const schema = DossierSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'resident'),
  SocialNumberGeneratorModule,
  CaslModule,
  EtudiantModule
],
  exports:[DossierService]
})
export class DossierModule {}
