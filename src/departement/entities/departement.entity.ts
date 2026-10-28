import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Formation } from "src/formation/entities/formation.entity";

@Schema({timestamps:true})
export class Departement {
    _id: string;

    @Prop({type:String})
    nom: string;

    @Prop({type:String})
    ufr: string;
    
   formations: Formation[]
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
