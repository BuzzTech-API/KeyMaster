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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
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
    TermOfConditionModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware) //Ivan Germano: Aplicando o middleware
      .exclude(
        { path: 'user/login', method: RequestMethod.POST }, //Ivan Germano: Exclui a rota de login do middleware de sessão
        { path: 'user/create', method: RequestMethod.POST } //Ivan Germano: Exclui a rota de create do middleware, útil para testes no postman
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL }); //Ivan Germano: Define as rotas que devem ser protegidas
  }
}