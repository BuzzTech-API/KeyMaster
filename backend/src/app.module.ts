import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
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
import { UserHasConsent } from './user_has_consent/entities/user_has_consent.entity';
import { ConsentUpdate } from './consent_update/entities/consent_update.entity';
import { UserHasConsentModule } from './user_has_consent/user_has_consent.module';
import { ConsentUpdateModule } from './consent_update/consent_update.module';
import { SessionModule } from './session/session.module';
import { Session } from './session/entities/session.entity';
import { SessionMiddleware } from './session/services/session.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { BlacklistModule } from './blacklist/blacklist.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blacklist'),
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: 'db',
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
        Session
      ],
      synchronize: true,
    }),
    UserModule,
    PasswordModule,
    ConsentModule,
    SessionModule,
    TermOfConditionModule,
    UserHasConsentModule,
    ConsentUpdateModule,
    BlacklistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .exclude(
        { path: 'term-of-condition', method: RequestMethod.GET }, //Ivan Germano: Exclui a rota de create do middleware, útil para testes no postman
        { path: 'user-has-consent', method: RequestMethod.POST }, //Ivan Germano: Exclui a rota de create do middleware, útil para testes no postman
        { path: 'user/login', method: RequestMethod.POST },
        //{ path: 'blacklist', method: RequestMethod.POST }, //Ivan Germano: Rota para adicionar arbitrariamente um user na blacklist - DESCOMENTAR APENAS PARA TESTES
        { path: 'user/create', method: RequestMethod.POST }, //Ivan Germano: Exclui a rota de CREATE USER do middleware de sessão
        //{ path: 'user/:id', method: RequestMethod.DELETE }, // Ivan Germano: Exclui a rota de DELETE do middleware de sessão - DESCOMENTAR APENAS PARA TESTES
        //{ path: 'user/sanitize', method: RequestMethod.POST } // Ivan Germano: Rota para testes manuais de sanitização dos dados de backup pelo administrador - DESCOMENTAR APENAS PARA TESTES
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}



