import { Injectable } from '@nestjs/common';
import { CreateUserHasConsentDto } from './dto/create-user_has_consent.dto';
import { UpdateUserHasConsentDto } from './dto/update-user_has_consent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHasConsent } from './entities/user_has_consent.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserHasConsentService {
constructor(
    @InjectRepository(UserHasConsent)
    private readonly userHasConsentRepository: Repository<UserHasConsent>,
  ) {}
  create(createUserHasConsentDto: CreateUserHasConsentDto) {
    const newUserHasConsent = new UserHasConsent();
    newUserHasConsent.isAccept = createUserHasConsentDto.isAccept;
    newUserHasConsent.consent_id = createUserHasConsentDto.consent_id;
    newUserHasConsent.user_id = createUserHasConsentDto.user_id;
    newUserHasConsent.dateAccepted = new Date()
    return this.userHasConsentRepository.save(newUserHasConsent)
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
