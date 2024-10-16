import { Module } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { ConsentController } from './consent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consent } from './entities/consent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consent])],
  controllers: [ConsentController],
  providers: [ConsentService],
})
export class ConsentModule {}
