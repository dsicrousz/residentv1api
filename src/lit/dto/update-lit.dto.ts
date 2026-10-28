import { PartialType } from '@nestjs/mapped-types';
import { CreateLitDto } from './create-lit.dto';

export class UpdateLitDto extends PartialType(CreateLitDto) {}
