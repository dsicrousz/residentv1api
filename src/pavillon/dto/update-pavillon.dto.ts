import { PartialType } from '@nestjs/mapped-types';
import { CreatePavillonDto } from './create-pavillon.dto';

export class UpdatePavillonDto extends PartialType(CreatePavillonDto) {}
