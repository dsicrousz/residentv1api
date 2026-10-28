import { Module } from '@nestjs/common';
import { AllocationService } from './allocation.service';
import { AllocationController } from './allocation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Allocation, AllocationSchema } from './entities/allocation.entity';

@Module({
  imports:[MongooseModule.forFeatureAsync([{name:Allocation.name,useFactory:()=> {
    const schema = AllocationSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'resident')], 
  controllers: [AllocationController],
  providers: [AllocationService],
  exports:[AllocationService]
})
export class AllocationModule {}
