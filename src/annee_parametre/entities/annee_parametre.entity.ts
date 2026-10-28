import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";
import { Schema as MongooseSchema } from "mongoose";
import { HydratedDocument } from "mongoose";


export type AnneeParametreDocument = HydratedDocument<AnneeParametre>;

@Schema({ timestamps: true })
export class AnneeParametre {
  @Prop({type: MongooseSchema.Types.ObjectId, ref:AnneeUniversitaire.name,required:true})
  anneeUniversitaireId:string;

  @Prop({type:String,required:true})
  pedagogique_session:string;

  @Prop({type:Number,required:true})
  pedagogique:number;

  @Prop({type:Number,default:0})
  social:number;

  @Prop({type:Number,default:0})
  licence1:number;

  @Prop({type:Number,default:0})
  licence2:number;

  @Prop({type:Number,default:0})
  licence3:number;

  @Prop({type:Number,default:0})
  master1:number;

  @Prop({type:Number,default:0})
  master2:number;

  @Prop({type:Number,default:0})
  amicale:number;

  @Prop({type:Number,default:0})
  interne:number;

  @Prop({type:Number,default:0})
  autre:number;

  @Prop({type:Number,default:0})
  etranger:number;

  @Prop({type:Number,default:0})
  depot:number;
}

export const AnneeParametreSchema = SchemaFactory.createForClass(AnneeParametre);

