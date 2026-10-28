import { PartialType } from '@nestjs/mapped-types';
import { CreateAnneeUniversitaireDto } from './create-annee_universitaire.dto';

export class UpdateAnneeUniversitaireDto extends PartialType(CreateAnneeUniversitaireDto) {}
