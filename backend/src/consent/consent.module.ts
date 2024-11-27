import { Module } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { ConsentController } from './consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consent } from './entities/consent.entity';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consent, UserHasConsent])],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConsentModule {}
