import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateSessionEtudiantDto {
@IsString()
nom: string;

@IsOptional()
@IsBoolean()
etat: boolean;
}
