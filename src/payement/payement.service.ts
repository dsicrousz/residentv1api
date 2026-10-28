import { Injectable } from '@nestjs/common';
import { CreatePayementDto } from './dto/create-payement.dto';
import { UpdatePayementDto } from './dto/update-payement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payement, PayementDocument } from './entities/payement.entity';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

@Injectable()
export class PayementService {
  @InjectModel(Payement.name,"resident")
  private payementModel: Model<PayementDocument>;

  create(createPayementDto: CreatePayementDto) {
    try {
      const payement = new this.payementModel(createPayementDto);
      return payement.save();
    } catch (error) {
      throw new HttpException('error creating payement', 500);
    }
  }

  findAllByAnneeUniversitaire(id:string):Promise<PayementDocument[]> {
    try {
      return this.payementModel.find({anneeUniversitaireId:id}).populate("dossierId").exec();
    } catch (error) {
      throw new HttpException('error getting payement', 500);
    }
  }

  findByDossier(id:string):Promise<PayementDocument[]> {
    try {
      return this.payementModel.find({dossierId:id}).exec();
    } catch (error) {
      throw new HttpException('error getting payement', 500);
    }
  }

  findOne(id: string):Promise<PayementDocument> {
    try {
      return this.payementModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('error getting payement', 500);
    }
  }

  update(id:string, updatePayementDto: UpdatePayementDto) {
    try {
      return this.payementModel.findByIdAndUpdate(id,updatePayementDto,{new:true}).exec();
    } catch (error) {
      throw new HttpException('error updating payement', 500);
    }
  }

  remove(id: string) {
    try {
      return this.payementModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('error deleting payement', 500);
    }
  }
}
