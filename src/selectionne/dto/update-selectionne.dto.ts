import { PartialType } from '@nestjs/mapped-types';
import { CreateSelectionneDto } from './create-selectionne.dto';

export class UpdateSelectionneDto extends PartialType(CreateSelectionneDto) {}
