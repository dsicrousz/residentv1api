import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialNumberGeneratorDto } from './create-social-number-generator.dto';

export class UpdateSocialNumberGeneratorDto extends PartialType(CreateSocialNumberGeneratorDto) {}
