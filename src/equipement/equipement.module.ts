import { Module } from '@nestjs/common';
import { EquipementService } from './equipement.service';
import { EquipementController } from './equipement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Equipement, EquipementSchema } from './entities/equipement.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Equipement.name,schema:EquipementSchema}],'resident')],
  controllers: [EquipementController],
  providers: [EquipementService],
})
export class EquipementModule {}
