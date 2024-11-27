import { Module } from '@nestjs/common';
import { TermOfConditionService } from './term-of-condition.service';
import { TermOfConditionController } from './term-of-condition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermOfCondition } from './entities/term-of-condition.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TermOfCondition])],
  controllers: [TermOfConditionController],
  providers: [TermOfConditionService],
})
export class TermOfConditionModule {}
