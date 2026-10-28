import { IsBoolean, IsString } from "class-validator";

export class CreateAnneeUniversitaireDto {

    @IsString()
    nom:string;

    @IsBoolean()
    isActif:boolean;
}
