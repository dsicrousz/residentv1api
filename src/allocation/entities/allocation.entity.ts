import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Dossier } from "src/dossier/entities/dossier.entity";
import { HydratedDocument,Schema as MongoSchema } from "mongoose";
import { Equipement } from "src/equipement/entities/equipement.entity";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";

export type AllocationDocument = HydratedDocument<Allocation>;

@Schema({timestamps:true})
export class Allocation {
    @Prop({type:Date,required:true})
    date:Date;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Dossier.name,required:true})
    dossierId:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Equipement.name,required:true,autopopulate:true})
    equipementId:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:AnneeUniversitaire.name,required:true,autopopulate:true})
    anneeUniversitaireId:string;

    @Prop({type:Number,required:true})
    nombre:number;

    @Prop({type:String})
    description:string;

    @Prop({type:String})
    constatation:string;
}

export const AllocationSchema = SchemaFactory.createForClass(Allocation);
