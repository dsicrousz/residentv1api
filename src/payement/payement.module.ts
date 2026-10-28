import { Module } from '@nestjs/common';
import { PayementService } from './payement.service';
import { PayementController } from './payement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payement, PayementSchema } from './entities/payement.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Payement.name,schema:PayementSchema}],'resident')],
  controllers: [PayementController],
  providers: [PayementService],
  exports:[PayementService]
})
export class PayementModule {}
