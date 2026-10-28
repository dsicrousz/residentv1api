import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,Schema as MongoSchema } from "mongoose";
import { Chambre } from "src/chambre/entities/chambre.entity";
import { Lit } from "src/lit/entities/lit.entity";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";
import { Selectionne } from "src/selectionne/entities/selectionne.entity";

export type DossierDocument = HydratedDocument<Dossier>;

@Schema({timestamps:true})
export class Dossier {

    @Prop({type:String, unique:true})
    numero:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Chambre.name,required:true,autopopulate:true})
    chambreId:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Lit.name,required:true,autopopulate:true})
    litId:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:Selectionne.name,required:true,autopopulate:{select:'inscription _id typeCodif formation anneeUniversitaire'}})
    selectionId:string;

    @Prop({type:MongoSchema.Types.ObjectId,ref:AnneeUniversitaire.name,required:true,autopopulate:true})
    anneeUniversitaireId:string;

    @Prop({type:Boolean,default:true})
    active:boolean;

    @Prop({type:Number,default:5000})
    caution:number;

    @Prop({type:Number,default:3000})
    taux_loyer_mensuelle:number;
}

export const DossierSchema = SchemaFactory.createForClass(Dossier).index({litId:1,anneeUniversitaireId:1},{unique:true});

