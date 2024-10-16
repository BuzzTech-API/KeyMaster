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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // or your database type
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'keymaster',
      entities: [User, Password, Consent, TermOfCondition],
      synchronize: true,
    }),
    UserModule,
    PasswordModule,
    ConsentModule,
    TermOfConditionModule],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }