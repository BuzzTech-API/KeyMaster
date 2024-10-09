import { Test, TestingModule } from '@nestjs/testing';
import { TermOfConditionController } from './term-of-condition.controller';
import { TermOfConditionService } from './term-of-condition.service';

describe('TermOfConditionController', () => {
  let controller: TermOfConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermOfConditionController],
      providers: [TermOfConditionService],
    }).compile();

    controller = module.get<TermOfConditionController>(TermOfConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
