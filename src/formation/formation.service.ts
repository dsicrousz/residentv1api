import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formation } from './entities/formation.entity';

@Injectable()
export class FormationService {
 constructor(@InjectModel(Formation.name,'etudiant') private formationModel: Model<Formation>) {
 }

 async findByNiveau(): Promise<any> {
   try {
    return await this.formationModel.aggregate().group({
        _id: {_id: {$substr: [ "$nom", {$subtract: [{ $strLenBytes: "$nom" },8]},-1  ]}, departement: "$departement"},
        total: {
          $sum: 1
        }
      }).addFields({
        "departement": {"$toObjectId": "$_id.departement"}
      }).lookup({
        from: "departements",
        localField: "departement",
        foreignField: "_id",
        as: "departement"
      }).unwind({
        path: "$departement",
        preserveNullAndEmptyArrays: true
      })
   } catch (error) {
    throw new HttpException(error.message,500);
   }
 }

 async findAll(): Promise<Formation[]> {
  try {
    return await this.formationModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
}

 async findOne(id: string): Promise<Formation> {
  try {
    return await this.formationModel.findById(id);
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
}
}
