import { Injectable } from '@nestjs/common';
import { SocialNumberGenerator } from './entities/social-number-generator.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SocialNumberGeneratorService {
 
  constructor(@InjectModel(SocialNumberGenerator.name,"resident") private socialNumberGeneratorModel: Model<SocialNumberGenerator>) {}

  async getNextSequence(prefix: string): Promise<string> {
    const key = `${prefix}`;

    const counter = await this.socialNumberGeneratorModel.findOneAndUpdate(
      { key },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // crée si n'existe pas
    );

    const seqNum = counter.seq.toString().padStart(4, '0'); // 00001, 00002...
    return `${key}-${seqNum}`;
  }

}
