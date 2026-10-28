import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AnneeUniversitaireDocument = HydratedDocument<AnneeUniversitaire>;

@Schema({ timestamps: true })
export class AnneeUniversitaire {
    _id: string;

    @Prop({ type: String, required: true })
    nom: string;

    @Prop({ type: Boolean, required: true })
    isActif: boolean;
}


export const AnneeUniversitaireSchema = SchemaFactory.createForClass(AnneeUniversitaire);
