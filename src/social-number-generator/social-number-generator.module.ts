import { Module } from '@nestjs/common';
import { SocialNumberGeneratorService } from './social-number-generator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SocialNumberGenerator, SocialNumberGeneratorSchema } from './entities/social-number-generator.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: SocialNumberGenerator.name, schema: SocialNumberGeneratorSchema }],'resident')],
  providers: [SocialNumberGeneratorService],
  exports: [SocialNumberGeneratorService]
})
export class SocialNumberGeneratorModule {}
