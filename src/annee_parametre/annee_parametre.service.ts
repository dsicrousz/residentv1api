import { Injectable,HttpException } from '@nestjs/common';
import { CreateAnneeParametreDto } from './dto/create-annee_parametre.dto';
import { UpdateAnneeParametreDto } from './dto/update-annee_parametre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnneeParametre } from './entities/annee_parametre.entity';

@Injectable()
export class AnneeParametreService {
 
  constructor(
    @InjectModel(AnneeParametre.name, 'resident') private anneeParametreModel: Model<AnneeParametre>,
  ) {}

  async create(createAnneeParametreDto: CreateAnneeParametreDto) {
    try {
      const createdAnneeParametre = new this.anneeParametreModel(createAnneeParametreDto);
      return createdAnneeParametre.save();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOneByAnneeUniversitaireId(id: string) {
    try {
      return this.anneeParametreModel.findOne({anneeUniversitaireId:id});
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updateAnneeParametreDto: UpdateAnneeParametreDto) {
    try {
      return this.anneeParametreModel.findByIdAndUpdate(id, updateAnneeParametreDto, { new: true }).exec();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string) {
    try {
      return this.anneeParametreModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
