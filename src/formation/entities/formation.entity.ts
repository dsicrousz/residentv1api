import { SchemaFactory } from "@nestjs/mongoose";
import { Departement } from "src/departement/entities/departement.entity";

export class Formation {
    _id: string;
    nom: string;
    departement: Departement | string;
    effectifHomme: number;
    effectifFemme: number;
}


export const FormationSchema = SchemaFactory.createForClass(Formation);