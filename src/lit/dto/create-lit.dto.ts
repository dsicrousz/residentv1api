import { IsBoolean, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateLitDto {

    @IsMongoId()
    anneeUniversitaireId:string;

    @IsString()
    numero:string;

    @IsMongoId()
    chambreId:string;

    @IsOptional()
    @IsString()
    description?:string;

    @IsBoolean()
    actif?:boolean;
}
