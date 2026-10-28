import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { TYPECODIF } from "../dto/create-selectionne.dto";
import { AnneeUniversitaire } from "src/annee_universitaire/entities/annee_universitaire.entity";

export type SelectionneDocument = Selectionne & Document;

@Schema({timestamps: true})
export class Selectionne {
    @Prop({type: Types.ObjectId, ref: AnneeUniversitaire.name, required: true})
    anneeUniversitaire: AnneeUniversitaire;

    @Prop({type: Object, required: true})
    inscription: any;

    @Prop({type: String,enum:TYPECODIF, default:TYPECODIF.PEDAGOGIQUE, required: true})
    typeCodif: string;

    @Prop({type: String, required: true})
    formation: string;

    @Prop({type: String})
    motif: string;
}

export const SelectionneSchema = SchemaFactory.createForClass(Selectionne);
