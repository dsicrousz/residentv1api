import { Module } from '@nestjs/common';
import { ChambreService } from './chambre.service';
import { ChambreController } from './chambre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chambre, ChambreSchema } from './entities/chambre.entity';

@Module({
  controllers: [ChambreController],
  providers: [ChambreService],
  imports:[MongooseModule.forFeatureAsync([{name:Chambre.name,useFactory:()=> {
    const schema = ChambreSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'resident')],
  exports:[ChambreService]
})
export class ChambreModule {}
