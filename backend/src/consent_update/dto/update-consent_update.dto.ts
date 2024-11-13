import { PartialType } from '@nestjs/mapped-types';
import { CreateConsentUpdateDto } from './create-consent_update.dto';

export class UpdateConsentUpdateDto extends PartialType(CreateConsentUpdateDto) {}
