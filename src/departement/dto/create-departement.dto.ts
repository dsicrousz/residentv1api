import { IsMongoId, IsString } from "class-validator";

export class CreateDepartementDto {
    @IsString()
    nom: string;

    @IsMongoId()
    ufr: string;
}
