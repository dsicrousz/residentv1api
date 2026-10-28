import { HttpException, Injectable } from '@nestjs/common';
import { CreateLitDto } from './dto/create-lit.dto';
import { UpdateLitDto } from './dto/update-lit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Lit } from './entities/lit.entity';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class LitService {
  constructor(@InjectModel(Lit.name,'resident') private litModel: mongoose.Model<Lit>) {}
  create(createLitDto: CreateLitDto) {
    try {
      const lit = new this.litModel(createLitDto);
      return lit.save();
    } catch (error) {
      throw new HttpException('error creating lit', 500);
    }
  }

  findAll() {
    try {
      return this.litModel.find();
    } catch (error) {
      throw new HttpException('error getting lits', 500);
    }
  }

  findOne(id: string) {
    try {
      return this.litModel.findById(id).populate('chambreId').exec();
    } catch (error) {
      throw new HttpException('error getting lit', 500);
    }
  }

  findAllByAnneeUniversitaire(anneeUniversitaireId:string) {
    try {
      return this.litModel.aggregate([
        {
          $match:{
            anneeUniversitaireId: new Types.ObjectId(anneeUniversitaireId)
          }
        },
        {
          $lookup:{
            from:'chambres',
            localField:'chambreId',
            foreignField:'_id',
            pipeline:[
              {
              $lookup:{
                from: 'pavillons',
                localField: 'pavillonId',
                foreignField: '_id',
                as: 'pavillon'
              }
              },
              {$unwind:'$pavillon'}
            ],
            as:'chambre'
          }
        },
        {
          $unwind:'$chambre'
        }
      ]).exec();
    } catch (error) {
      throw new HttpException('error getting lits', 500);
    }
  }

  findAllByChambre(chambreId:string) {
    try {
      return this.litModel.find({chambreId: chambreId});
    } catch (error) {
      throw new HttpException('error getting lits', 500);
    }
  }

  update(id: string, updateLitDto: UpdateLitDto) {
    try {
      return this.litModel.findByIdAndUpdate(id, updateLitDto);
    } catch (error) {
      throw new HttpException('error updating lit', 500);
    }
  }

  remove(id: string) {
    try {
      return this.litModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('error deleting lit', 500);
    }
  }
}
