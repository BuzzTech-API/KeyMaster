import { Module } from '@nestjs/common';
import { PasswordService } from './services/password.service';
import { PasswordController } from './password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Password } from './entities/password.entity';
import { PasswordEncryptionService } from './services/passwordEncryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([Password])],
  controllers: [PasswordController],
  providers: [PasswordService, PasswordEncryptionService],
})
export class PasswordModule {}
