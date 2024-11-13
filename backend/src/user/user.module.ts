import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptionService } from './services/encryption.service';
import { UserHasConsentService } from 'src/user_has_consent/user_has_consent.service';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserHasConsent])],
  controllers: [UserController],
  providers: [UserService, EncryptionService],
  exports: [UserService],
})
export class UserModule {}
