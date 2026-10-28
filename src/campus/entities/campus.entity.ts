import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,Schema as MongooseSchema } from "mongoose";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";

export type CampusDocument = HydratedDocument<Campus>;

@Schema({timestamps:true})
export class Campus {
    @Prop({type:String,required:true})
    nom:string;

    @Prop({type:String})
    adresse:string;

    @Prop({type:String})
    latitude:string;    

    @Prop({type:String})
    longitude:string;

    @Prop({type: MongooseSchema.Types.ObjectId,ref:AnneeUniversitaire.name,required:true})
    anneeUniversitaireId:string;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);

