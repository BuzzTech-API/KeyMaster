import { PartialType } from '@nestjs/mapped-types';
import { CreateUserHasConsentDto } from './create-user_has_consent.dto';

export class UpdateUserHasConsentDto extends PartialType(CreateUserHasConsentDto) {}
