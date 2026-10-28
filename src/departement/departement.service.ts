import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Departement } from './entities/departement.entity';

@Injectable()
export class DepartementService {
  constructor(@InjectModel(Departement.name,"etudiant") private departementModel: Model<Departement>) {
    
  }

  async findBySessionPedagogique(session:string): Promise<any[]> {
    try {
      return await this.departementModel.aggregate([
        {$match:{
          session
        }},
        {$addFields:{
        id: {
          $toString: "$_id",
        },
      }},{$lookup: {
        from: "formations",
        localField: "id",
        foreignField: "departement",
        as: "formations",
      }}]).sort({ createdAt: -1 });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  
}
