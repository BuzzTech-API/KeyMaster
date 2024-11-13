import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PasswordModule } from './password/password.module';
import { ConsentModule } from './consent/consent.module';
import { TermOfConditionModule } from './term-of-condition/term-of-condition.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consent } from './consent/entities/consent.entity';
import { Password } from './password/entities/password.entity';
import { User } from './user/entities/user.entity';
import { TermOfCondition } from './term-of-condition/entities/term-of-condition.entity';
import { UserHasConsentController } from './user_has_consent/user_has_consent.controller';
import { ConsentUpdateController } from './consent_update/consent_update.controller';
import { UserHasConsent } from './user_has_consent/entities/user_has_consent.entity';
import { ConsentUpdate } from './consent_update/entities/consent_update.entity';
import { UserHasConsentModule } from './user_has_consent/user_has_consent.module';
import { ConsentUpdateModule } from './consent_update/consent_update.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Senha123#',
      database: 'keymaster',
      entities: [
        User,
        Password,
        Consent,
        TermOfCondition,
        UserHasConsent,
        ConsentUpdate,
      ],
      synchronize: true,
    }),
    UserModule,
    PasswordModule,
    ConsentModule,
    TermOfConditionModule,
    UserHasConsentModule,
    ConsentUpdateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
