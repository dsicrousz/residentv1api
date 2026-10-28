import { IsOptional, IsString } from "class-validator";

export class CreateEquipementDto {
    @IsString()
    nom:string;

    @IsString()
    @IsOptional()
    description:string;
}
