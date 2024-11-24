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
import { SessionModule } from './session/session.module';
import { Session } from './session/entities/session.entity';
import { SessionMiddleware } from './session/services/session.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { BlacklistModule } from './blacklist/blacklist.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blacklist'),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'keymaster',
      entities: [User, Password, Consent, TermOfCondition, Session],
      synchronize: true,
    }),
    UserModule,
    PasswordModule,
    ConsentModule,
    SessionModule,
    TermOfConditionModule,
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
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/create', method: RequestMethod.POST }, //Ivan Germano: Exclui a rota de CREATE USER do middleware de sessão
        { path: 'user/:id', method: RequestMethod.DELETE } // Ivan Germano: Exclui a rota de DELETE do middleware de sessão - DESCOMENTAR APENAS PARA TESTES
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}



