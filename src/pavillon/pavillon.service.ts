import { HttpException, Injectable } from '@nestjs/common';
import { CreatePavillonDto } from './dto/create-pavillon.dto';
import { UpdatePavillonDto } from './dto/update-pavillon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pavillon, PavillonDocument } from './entities/pavillon.entity';
import { Model, Types } from 'mongoose';

@Injectable()
export class PavillonService {
    @InjectModel(Pavillon.name,"resident")
    private pavillonModel: Model<PavillonDocument>;

  create(createPavillonDto: CreatePavillonDto) {
    try {
      const pavillon = new this.pavillonModel(createPavillonDto);
      return pavillon.save();
    } catch (error) {
      throw new HttpException('error creating pavillon', 500);
    }
  }

  findAllByAnneeUniversitaire(anneeUniversitaireId:string) {
    try {
      return this.pavillonModel.aggregate([
        {
          $match:{
            anneeUniversitaireId: new Types.ObjectId(anneeUniversitaireId)
          }
        },

        {
          $lookup:{
            from:'campus',
            localField:'campusId',
            foreignField:'_id',
            as:'campus'
          }
        },

        {
          $unwind:'$campus'
        },

        {
          $lookup:{
            from:'chambres',
            localField:'_id',
            foreignField:'pavillonId',
            as:'chambres'
          }
        }
      ]).exec();
    } catch (error) {
      throw new HttpException('error getting pavillons', 500);
    }
  }

  findAllByCampus(id:string) {
    try {
      return this.pavillonModel.aggregate([
        {
          $match:{
            campusId: new Types.ObjectId(id)
          }
        },
        
        {
          $lookup:{
            from:'chambres',
            localField:'_id',
            foreignField:'pavillonId',
            as:'chambres'
          }
        }
      ]).exec();
    } catch (error) {
      throw new HttpException('error getting pavillons', 500);
    }
  }

  async findOne(id: string) {
    try {
      const pavillon = await this.pavillonModel.aggregate([
        {
          $match:{
            _id: new Types.ObjectId(id)
          }
        },
         {
          $lookup:{
            from:'campus',
            localField:'campusId',
            foreignField:'_id',
            as:'campus'
          }
        },

        {
          $unwind:'$campus'
        },
        {
          $lookup:{
            from:'chambres',
            localField:'_id',
            foreignField:'pavillonId',
            as:'chambres'
          }
        }
      ]).exec();
      return pavillon.at(0);
    } catch (error) {
      throw new HttpException('error getting pavillon', 500);
    }
  }

  update(id:string, updatePavillonDto: UpdatePavillonDto) {
    try {
      return this.pavillonModel.findByIdAndUpdate(id,updatePavillonDto,{new:true}).exec();
    } catch (error) {
      throw new HttpException('error updating pavillon', 500);
    }
  }

  remove(id: string) {
    try {
      return this.pavillonModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('error deleting pavillon', 500);
    }
  }
}
