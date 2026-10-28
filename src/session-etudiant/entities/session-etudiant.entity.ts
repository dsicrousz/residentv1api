import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type SessionEtudiantDocument = Session & Document;

@Schema({timestamps:true})
export class Session {
    _id: string;
    
    @Prop({type: String, required: true,unique: true})
    nom: string;

    @Prop({type: Boolean, required: true,default: false})
    etat: boolean;
}

export const SessionEtudiantSchema = SchemaFactory.createForClass(Session);
