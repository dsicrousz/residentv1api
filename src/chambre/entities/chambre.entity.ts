import { Prop,SchemaFactory,Schema } from "@nestjs/mongoose";
import { HydratedDocument,Schema as MongoSchema } from "mongoose";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";
import { Pavillon } from "src/pavillon/entities/pavillon.entity";

export type ChambreDocument = HydratedDocument<Chambre>;

@Schema({timestamps:true})
export class Chambre {
    @Prop({type:String,required:true})
    nom:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Pavillon.name,required:true,autopopulate:true})
    pavillonId:string;

    @Prop({type: MongoSchema.Types.ObjectId,ref:AnneeUniversitaire.name,required:true})
    anneeUniversitaireId:string;
}

export const ChambreSchema = SchemaFactory.createForClass(Chambre).index({nom:1,pavillonId:1,anneeUniversitaireId:1},{unique:true});

