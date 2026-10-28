import { Injectable } from '@nestjs/common';
import { CreateAllocationDto } from './dto/create-allocation.dto';
import { UpdateAllocationDto } from './dto/update-allocation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Allocation, AllocationDocument } from './entities/allocation.entity';
import { HttpException } from '@nestjs/common';

@Injectable()
export class AllocationService {
  @InjectModel(Allocation.name,"resident")
  private allocationModel: Model<AllocationDocument>;

  create(createAllocationDto: CreateAllocationDto) {
    try {
      const allocation = new this.allocationModel(createAllocationDto);
      return allocation.save();
    } catch (error) {
      throw new HttpException('error creating allocation', 500);
    }
  }


  findAllByAnneeUniversitaire(id:string):Promise<AllocationDocument[]> {
    try {
      return this.allocationModel.find({anneeUniversitaireId:id}).populate("dossierId").exec();
    } catch (error) {
      throw new HttpException('error getting allocation', 500);
    }
  }
 

  findAll() {
    try {
      return this.allocationModel.find().exec();
    } catch (error) {
      throw new HttpException('error getting allocation', 500);
    }
  }

  async findAllByDossier(id:string):Promise<AllocationDocument[]> {
    try {
      return this.allocationModel.find({dossierId:id}).exec();
    } catch (error) {
      throw new HttpException('error getting allocation', 500);
    }
  }

  findOne(id: string) {
    try {
      return this.allocationModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('error getting allocation', 500);
    }
  }

  update(id: string, updateAllocationDto: UpdateAllocationDto) {
    try {
      return this.allocationModel.findByIdAndUpdate(id,updateAllocationDto,{new:true}).exec();
    } catch (error) {
      throw new HttpException('error updating allocation', 500);
    }
  }

  remove(id: string) {
    try {
      return this.allocationModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('error deleting allocation', 500);
    }
  }
}
