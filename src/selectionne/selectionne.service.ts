import { Injectable,HttpException } from '@nestjs/common';
import { CreateSelectionneDto, TYPECODIF } from './dto/create-selectionne.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Selectionne, SelectionneDocument } from './entities/selectionne.entity';
import { Model } from 'mongoose';

@Injectable()
export class SelectionneService {
  constructor(@InjectModel(Selectionne.name,'resident') private selectionneModel: Model<SelectionneDocument>) {}

  async create(createSelectionneDto: CreateSelectionneDto) {
    try {
      const selectionne = new this.selectionneModel(createSelectionneDto);
      return await selectionne.save();
    } catch (error) {
      throw new HttpException('error creating selectionne', 500);
    }
  }

  async findByTypeAndFormation(anneeUniversitaire: string, formation: string,typeCodif: TYPECODIF): Promise<Selectionne[]> {
    try {
      return await this.selectionneModel.find({anneeUniversitaire,formation,typeCodif})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async findBySociale(anneeUniversitaire: string): Promise<Selectionne[]> {
    try {
      return await this.selectionneModel.find({anneeUniversitaire,typeCodif: TYPECODIF.SOCIALE})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findBySession(anneeUniversitaire: string,typeCodif?: TYPECODIF): Promise<Selectionne[]> {
    try {
      const mathched = {anneeUniversitaire} as any
      if(typeCodif){
        mathched.typeCodif = typeCodif
      }
      return await this.selectionneModel.find(mathched)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByDepartement(departement: string): Promise<Selectionne[]> {
    try {
      return await this.selectionneModel.find({'inscription.formation.departement': departement});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<Selectionne> {
    try {
      return await this.selectionneModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.selectionneModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('error deleting selectionne', 500);
    }
  }
}
 
