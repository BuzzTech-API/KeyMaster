import { Injectable } from '@nestjs/common';
import { CreateUserHasConsentDto } from './dto/create-user_has_consent.dto';
import { UpdateUserHasConsentDto } from './dto/update-user_has_consent.dto';

@Injectable()
export class UserHasConsentService {
  create(createUserHasConsentDto: CreateUserHasConsentDto) {
    return 'This action adds a new userHasConsent';
  }

  findAll() {
    return `This action returns all userHasConsent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userHasConsent`;
  }

  update(id: number, updateUserHasConsentDto: UpdateUserHasConsentDto) {
    return `This action updates a #${id} userHasConsent`;
  }

  remove(id: number) {
    return `This action removes a #${id} userHasConsent`;
  }
}
