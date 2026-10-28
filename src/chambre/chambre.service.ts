import { Injectable } from '@nestjs/common';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Chambre, ChambreDocument } from './entities/chambre.entity';
import { Model, Types } from 'mongoose';
import { HttpException } from '@nestjs/common';

@Injectable()
export class ChambreService {
    @InjectModel(Chambre.name,"resident")
    private chambreModel: Model<ChambreDocument>;

  create(createChambreDto: CreateChambreDto) {
    try {
      const chambre = new this.chambreModel(createChambreDto);
      return chambre.save();
    } catch (error) {
      throw new HttpException('error creating chambre', 500);
    }
  }

  findAllByPavillon(id:string) {
    try {
      return this.chambreModel.aggregate([
        {
          $match:{
            pavillonId: new Types.ObjectId(id)
          }
        },
        {
          $lookup:{
            from:'pavillons',
            localField:'pavillonId',
            foreignField:'_id',
            as:'pavillon'
          }
        },
        {
          $unwind:'$pavillon'
        },
        {
          $lookup:{
            from:'lits',
            localField:'_id',
            foreignField:'chambreId',
            as:'lits'
          }
        }
      ]);
    } catch (error) {
      throw new HttpException('error getting chambres', 500);
    }
  }

  findAllByAnneeUniversitaire(anneeUniversitaireId:string) {
    try {
      return this.chambreModel.aggregate([
        {
          $match:{
            anneeUniversitaireId: new Types.ObjectId(anneeUniversitaireId)
          }
        },
        {
          $lookup:{
            from:'pavillons',
            localField:'pavillonId',
            foreignField:'_id',
            as:'pavillon'
          }
        },
        {
          $unwind:'$pavillon'
        },
        {
          $lookup:{
            from:'lits',
            localField:'_id',
            foreignField:'chambreId',
            as:'lits'
          }
        }
      ]);
    } catch (error) {
      throw new HttpException('error getting chambres', 500);
    }
  }

  async findOne(id: string): Promise<Chambre> {
    try {
      const chambre = await this.chambreModel.aggregate<Chambre>([
        {
          $match:{
            _id: new Types.ObjectId(id)
          }
        },
        {
          $lookup:{
            from:'pavillons',
            localField:'pavillonId',
            foreignField:'_id',
            as:'pavillon'
          }
        },
        {
          $unwind:'$pavillon'
        },
        {
          $lookup:{
            from:'lits',
            localField:'_id',
            foreignField:'chambreId',
            as:'lits'
          }
        }
      ]).exec();
      return chambre.at(0);
    } catch (error) {
      throw new HttpException('error getting chambre', 500);
    }
  }

  update(id:string, updateChambreDto: UpdateChambreDto) {
    try {
      return this.chambreModel.findByIdAndUpdate(id,updateChambreDto,{new:true});
    } catch (error) {
      throw new HttpException('error updating chambre', 500);
    }
  }

  remove(id: string) {
    try {
      return this.chambreModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException('error deleting chambre', 500);
    }
  }
}
