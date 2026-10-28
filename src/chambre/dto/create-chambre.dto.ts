import { IsNumber, IsMongoId, IsString } from "class-validator";

export class CreateChambreDto {
    @IsString()
    nom:string;

    @IsMongoId()
    pavillonId:string;

    @IsMongoId()
    anneeUniversitaireId:string;
}
