import { IsEnum, IsMongoId, IsOptional, IsString } from "class-validator";

export enum TypePavillon {
    HOMME= "HOMME",
    FEMME= "FEMME"
}

export class CreatePavillonDto {
    @IsString()
    nom:string;

   @IsMongoId()
   campusId:string;

   @IsEnum(TypePavillon)
   type:TypePavillon;

   @IsOptional()
   @IsString()
   description?:string;

   @IsMongoId()
   anneeUniversitaireId:string;
}
