import { Module } from '@nestjs/common';
import { ConsentUpdateService } from './consent_update.service';
import { ConsentUpdateController } from './consent_update.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';
import { ConsentUpdate } from './entities/consent_update.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserHasConsent, ConsentUpdate])],
  controllers: [ConsentUpdateController],
  providers: [ConsentUpdateService],
})
export class ConsentUpdateModule {}
