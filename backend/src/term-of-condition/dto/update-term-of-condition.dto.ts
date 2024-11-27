import { PartialType } from '@nestjs/mapped-types';
import { CreateTermOfConditionDto } from './create-term-of-condition.dto';

export class UpdateTermOfConditionDto extends PartialType(CreateTermOfConditionDto) {}
