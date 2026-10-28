import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Campus, CampusSchema } from './entities/campus.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'Campus',schema:CampusSchema}],"resident")],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [CampusService]
})
export class CampusModule {}
