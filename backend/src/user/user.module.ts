import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptionService } from './services/encryption.service';
import { SessionModule } from '../session/session.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  SessionModule,
],
  controllers: [UserController],
  providers: [UserService,  EncryptionService],
  exports: [UserService],
})
export class UserModule {}
