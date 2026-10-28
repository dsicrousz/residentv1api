import { IsEnum, IsMongoId, IsObject, IsOptional, IsString } from "class-validator";

export enum TYPECODIF {
    SOCIALE = "SOCIALE",
    PEDAGOGIQUE = "PEDAGOGIQUE"
}
export class CreateSelectionneDto {
    @IsMongoId()
    anneeUniversitaire: string;

    @IsObject()
    inscription: object;

    @IsOptional()
    @IsEnum(TYPECODIF)
    typeCodif: string;

    @IsOptional()
    @IsString()
    motif: string;

    @IsMongoId()
    formation: string;
}
