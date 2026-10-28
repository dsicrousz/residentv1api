import { HttpException, Injectable } from '@nestjs/common';
import { CreateEquipementDto } from './dto/create-equipement.dto';
import { UpdateEquipementDto } from './dto/update-equipement.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Equipement } from './entities/equipement.entity';

@Injectable()
export class EquipementService {
  constructor(@InjectModel(Equipement.name,'resident') private equipementModel:Model<Equipement>) {}

  async create(createEquipementDto: CreateEquipementDto) {
    try {
      const equipement = new this.equipementModel(createEquipementDto);
      return await equipement.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll() {
    try {
      return await this.equipementModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string) {
    try {
      return await this.equipementModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateEquipementDto: UpdateEquipementDto) {
    try {
      return await this.equipementModel.findByIdAndUpdate(id,updateEquipementDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string) {
    try {
      return await this.equipementModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
