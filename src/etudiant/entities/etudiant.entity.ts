import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type EtudiantDocument = Etudiant & Document;

@Schema({timestamps:true})
export class Etudiant {
    _id: string;

    @Prop({type:String})
    prenom: string;
  
    @Prop({type:String})
    nom: string;
  
    @Prop({type:String})
    email: string;
  
    @Prop({type:String})
    tel: string;
    
    @Prop({type:String})
    genre:string;

    @Prop({type:String})
    dateDeNaissance: string;
    
    @Prop({type:String})
    lieuDeNaissance: string;

    @Prop({type:String})
    nationalite: string;
  
    @Prop({type:String})
    avatar: string;
  
    @Prop({type:String,unique:true})
    ncs: string;
}


export const EtudiantSchema = SchemaFactory.createForClass(Etudiant);