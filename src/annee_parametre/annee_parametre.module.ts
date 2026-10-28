import { Module } from '@nestjs/common';
import { AnneeParametreService } from './annee_parametre.service';
import { AnneeParametreController } from './annee_parametre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnneeParametre, AnneeParametreSchema } from './entities/annee_parametre.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: AnneeParametre.name, schema: AnneeParametreSchema }], 'resident')],
  controllers: [AnneeParametreController],
  providers: [AnneeParametreService],
  exports: [AnneeParametreService]
})
export class AnneeParametreModule {}
