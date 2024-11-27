import { Module } from '@nestjs/common';
import { UserHasConsentService } from './user_has_consent.service';
import { UserHasConsentController } from './user_has_consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserHasConsent } from './entities/user_has_consent.entity';
import { ConsentUpdate } from 'src/consent_update/entities/consent_update.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserHasConsent, ConsentUpdate])],
  controllers: [UserHasConsentController],
  providers: [UserHasConsentService],
})
export class UserHasConsentModule {}
