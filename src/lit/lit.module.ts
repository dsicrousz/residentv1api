import { Module } from '@nestjs/common';
import { LitService } from './lit.service';
import { LitController } from './lit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lit, LitSchema } from './entities/lit.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Lit.name, schema: LitSchema}],'resident')],
  controllers: [LitController],
  providers: [LitService],
  exports: [LitService]
})
export class LitModule {}
