import { IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";


export enum Mois {
    JANVIER = 'JANVIER',
    FEBRER = 'FEVRIER',
    MARS = 'MARS',
    AVRIL = 'AVRIL',
    MAI = 'MAI',
    JUIN = 'JUIN',
    JUILLET = 'JUILLET',
    AOUT = 'AOUT',
    SEPTEMBRE = 'SEPTEMBRE',
    OCTOBRE = 'OCTOBRE',
    NOVEMBRE = 'NOVEMBRE',
    DECEMBRE = 'DECEMBRE'
}

export class CreatePayementDto {
    @IsMongoId()
    dossierId:string;

    @IsMongoId()
    anneeUniversitaireId:string;

    @IsNumber()
    montant:number;

    @IsEnum(Mois)
    mois:Mois;

    @IsString()
    numero_facture:string;

}
