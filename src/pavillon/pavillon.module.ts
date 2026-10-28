import { Module } from '@nestjs/common';
import { PavillonService } from './pavillon.service';
import { PavillonController } from './pavillon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pavillon, PavillonSchema } from './entities/pavillon.entity';

@Module({
  controllers: [PavillonController],
  providers: [PavillonService],
  imports:[MongooseModule.forFeatureAsync([{name: Pavillon.name,useFactory:()=> {
    const schema = PavillonSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'resident')],
  exports:[PavillonService]
})
export class PavillonModule {}
