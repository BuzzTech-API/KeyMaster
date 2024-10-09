import { Module } from '@nestjs/common';
import { TermOfConditionService } from './term-of-condition.service';
import { TermOfConditionController } from './term-of-condition.controller';

@Module({
  controllers: [TermOfConditionController],
  providers: [TermOfConditionService],
})
export class TermOfConditionModule {}
