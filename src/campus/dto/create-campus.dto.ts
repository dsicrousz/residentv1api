import { IsLatitude, IsLongitude, IsMongoId, IsOptional, IsString } from "class-validator";

export class CreateCampusDto {
    @IsString()
    nom:string;

    @IsOptional()
    @IsString()
    adresse?:string;

    @IsOptional()
    @IsString()
    @IsLatitude()
    latitude?:string;

    @IsOptional()
    @IsString()
    @IsLongitude()
    longitude?:string;

    @IsMongoId()
    anneeUniversitaireId:string;
}
