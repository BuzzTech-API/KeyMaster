import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PasswordModule } from './password/password.module';
import { ConsentModule } from './consent/consent.module';
import { TermOfConditionModule } from './term-of-condition/term-of-condition.module';

@Module({
  imports: [UserModule, PasswordModule, ConsentModule, TermOfConditionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
