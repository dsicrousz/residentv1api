import { PartialType } from '@nestjs/mapped-types';
import { CreateSessionEtudiantDto } from './create-session-etudiant.dto';

export class UpdateSessionEtudiantDto extends PartialType(CreateSessionEtudiantDto) {}
