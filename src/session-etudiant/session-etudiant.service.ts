import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionEtudiantDocument } from './entities/session-etudiant.entity';

@Injectable()
export class SessionEtudiantService {
  constructor(@InjectModel(Session.name,'etudiant') private sessionEtudiantModel: Model<SessionEtudiantDocument>) {}

  async findAllActivate(): Promise<Session[]> {
      try {
        return await this.sessionEtudiantModel.find({etat: true});
      }
      catch (err) {
        throw new HttpException(err.message,500);
      }
  }

  async findOne(id: string): Promise<Session> {
    try {
      return await this.sessionEtudiantModel.findById(id).exec();
    }
    catch (err) {
      throw new HttpException(err.message,500);
    }
  }

  async findAll(): Promise<Session[]> {
    try {
      return await this.sessionEtudiantModel.find();
    }
    catch (err) {
      throw new HttpException(err.message,500);
    }
  }
}