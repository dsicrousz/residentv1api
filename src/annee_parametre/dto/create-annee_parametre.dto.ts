import { IsMongoId, IsNumber } from "class-validator";

export class CreateAnneeParametreDto {
    @IsMongoId()
    anneeUniversitaireId:string;


    @IsMongoId()
    pedagogique_session:string;

    @IsNumber()
    pedagogique:number;

    @IsNumber()
    social:number;

    @IsNumber()
    licence1:number;

    @IsNumber()
    licence2:number;

    @IsNumber()
    licence3:number;

    @IsNumber()
    master1:number;

    @IsNumber()
    master2:number;

    @IsNumber()
    amicale:number;

    @IsNumber()
    interne:number;

    @IsNumber()
    autre:number;

    @IsNumber()
    etranger:number;

    @IsNumber()
    depot:number;
}
