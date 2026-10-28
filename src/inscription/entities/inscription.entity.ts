import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Etudiant } from "src/etudiant/entities/etudiant.entity";
import { Formation } from "src/formation/entities/formation.entity";

export type InscriptionDocument = Inscription & Document;

@Schema({timestamps: true})
export class Inscription {
    _id: string;

    @Prop({type: Types.ObjectId,ref: Etudiant.name,required: true, autopopulate: true})
    etudiant: Etudiant;

    @Prop({type: Types.ObjectId,ref: Formation.name,required: true,autopopulate: true})
    formation:Formation;

    @Prop({type: Boolean,required: true, default: false})
    active:boolean;

    @Prop({type: Boolean,required: true, default: false})
    is_codified:boolean;
}


export const InscriptionSchema = SchemaFactory.createForClass(Inscription);