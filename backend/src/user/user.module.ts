import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptionService } from './services/encryption.service';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';

import { SessionModule } from '../session/session.module';
import { PasswordEncryptionService } from 'src/password/services/passwordEncryption.service';

@Module({
  imports:[TypeOrmModule.forFeature([User, UserHasConsent]),
  forwardRef(() => SessionModule),
],
  controllers: [UserController],
  providers: [UserService,  EncryptionService, PasswordEncryptionService],
  exports: [UserService],
})
export class UserModule {}
