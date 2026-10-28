import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Etudiant, EtudiantDocument } from './entities/etudiant.entity';
import { InscriptionService } from 'src/inscription/inscription.service';
import { Inscription } from 'src/inscription/entities/inscription.entity';

@Injectable()
export class EtudiantService {
  constructor(@InjectModel(Etudiant.name,"etudiant") private etudiantModel: Model<EtudiantDocument>, private inscriptionService: InscriptionService){}

  async findAll(): Promise<Etudiant[]> {
  try {
    return await this.etudiantModel.find().sort({createdAt: 1});
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findOne(id: string): Promise<Etudiant> {
    try {
      const r =  await this.etudiantModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
          $addFields: {
            sId: {
              $toString: "$_id"
            }
          }
        },
        {
          $lookup: {
            from: "inscriptions",
            localField: "sId",
            foreignField: "etudiant",
            pipeline:[
              { $addFields: { Ssession: { $toObjectId: "$session" },Sformation: { $toObjectId: "$formation" } } },
         {
          $lookup: {
            from: "sessions",
            localField: "Ssession",
            foreignField: "_id",
            as: "session"
          }
        },
        {
          $lookup: {
            from: "formations",
            localField: "Sformation",
            foreignField: "_id",
            as: "formation"
          }
        },
         { $unwind: { path: "$session", preserveNullAndEmptyArrays: true } },
         { $unwind: { path: "$formation", preserveNullAndEmptyArrays: true } }
            ],
            as: "inscriptions"
          }
        }
      ]);

      return r.at(0)
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }


  async findInscription(id: string): Promise<Inscription> {
    try {
      const ins =  await this.inscriptionService.findOneActiveByEtudiant(id) as any[];
      return ins.length > 0 ? ins[0] : null;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async count(): Promise<number> {
    try {
      return await this.etudiantModel.countDocuments();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOneByNce(ncs: string): Promise<Etudiant> {
    try {
      return await this.etudiantModel.findOne({ncs});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAllByIds(ids:string[]): Promise<Etudiant[]> {
    try {
      return await this.etudiantModel.find({ncs:{$in:ids}});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
