import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateFormationDto {
    @IsString()
    nom: string;

    @IsMongoId()
    departement: string;

    @IsNumber()
    effectifHomme: number;

    @IsNumber()
    effectifFemme: number;
}
