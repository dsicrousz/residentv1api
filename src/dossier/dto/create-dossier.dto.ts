import { IsBoolean, IsMongoId, IsOptional, IsNumber, IsString } from "class-validator";

export class CreateDossierDto {
    @IsMongoId()
    chambreId:string;


    @IsMongoId()
    litId:string;

    @IsMongoId()
    selectionId:string;

    @IsMongoId()
    anneeUniversitaireId:string;

    @IsOptional()
    @IsBoolean()
    active?:boolean;

    @IsOptional()
    @IsNumber()
    caution?:number;

    @IsOptional()
    @IsNumber()
    taux_loyer_mensuelle?:number;
}
