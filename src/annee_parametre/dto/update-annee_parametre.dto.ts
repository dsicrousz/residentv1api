import { PartialType } from '@nestjs/mapped-types';
import { CreateAnneeParametreDto } from './create-annee_parametre.dto';

export class UpdateAnneeParametreDto extends PartialType(CreateAnneeParametreDto) {}
