import { HttpException, Injectable } from '@nestjs/common';
import { Inscription, InscriptionDocument } from './entities/inscription.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Injectable()
export class InscriptionService {
  constructor(@InjectModel(Inscription.name,"etudiant") private inscriptionModel: Model<InscriptionDocument>) {}

  async findOneActiveByEtudiant(id: string): Promise<any> {
    try {
      return await this.inscriptionModel.aggregate([
        {
          $match: {
            etudiant: id,
            active: true
          }
        },
        {
          $addFields:{
            fid: {$toObjectId:"$formation"}
          }
        },
        {
          $lookup: {
            from: "formations",
            localField: "fid",
            foreignField: "_id",
            as: "formation"
          }
        },
        {
          $unwind: "$formation"
        }
      ]);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findBySession(id: string): Promise<Inscription[]>{
    try {
      return await this.inscriptionModel.find({session: id});
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findBySessionAndFormation(session: string,formation:string): Promise<Inscription[]>{
    try {
      return await this.inscriptionModel.find({session,formation});
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findByEtudiant(id: string): Promise<Inscription[]>{
    try {
      return await this.inscriptionModel.find({etudiant: id});
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async   findTotalByDepartment(id: string): Promise<any>{
    try {
      return await this.inscriptionModel.aggregate([{$match:{
        "session": id,
        "active": true
      }},{$addFields: {
        "etudiant": {"$toObjectId": "$etudiant"},
        "session": {"$toObjectId": "$session"},
        "formation": {"$toObjectId": "$formation"},
      }}]).lookup({
        from: "formations",
        localField: "formation",
        foreignField: "_id",
        as: "formation"
      }).unwind({
        path: "$formation",
        preserveNullAndEmptyArrays: true
      }).group({
        _id: "$formation.departement",
        total: {
          $sum: 1
        },
      }).addFields({
        "_id": {"$toObjectId": "$_id"}
      }).lookup({
        from: "departements",
        localField: "_id",
        foreignField: "_id",
        as: "departement"
        }).unwind({
          path: "$departement",
          preserveNullAndEmptyArrays: true
        });
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findTotalByFormation(id: string): Promise<any>{
    try {
      return await this.inscriptionModel.aggregate([{$match:{
        "session":id,
        "active": true
      }}]).group({
        _id: "$formation",
         total: {
          $sum: 1
        }
      }).addFields({
        "_id": {"$toObjectId": "$_id"}
      }).lookup({
        from: "formations",
        localField: "_id",
        foreignField: "_id",
        as: "formation"
      }).unwind({
        path: "$formation",
        preserveNullAndEmptyArrays: true
      });
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async update(id: string, updateInscriptionDto: UpdateInscriptionDto) {
    try {
      return await this.inscriptionModel.findByIdAndUpdate(id, updateInscriptionDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
