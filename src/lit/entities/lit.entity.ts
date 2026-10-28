import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";
import { Chambre } from "src/chambre/entities/chambre.entity";

export type LitDocument = HydratedDocument<Lit>;

@Schema({timestamps:true})
export class Lit {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: AnneeUniversitaire.name,required:true})
    anneeUniversitaireId:string;

    @Prop({type:String,required:true})
    numero:string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Chambre.name,required:true})
    chambreId:string;

    @Prop({type:String})
    description?:string;

    @Prop({type:Boolean,default:true})
    actif?:boolean;
}

export const LitSchema = SchemaFactory.createForClass(Lit).index({numero:1,chambreId:1});



