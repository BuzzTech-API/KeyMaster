import { Test, TestingModule } from '@nestjs/testing';
import { TermOfConditionService } from './term-of-condition.service';

describe('TermOfConditionService', () => {
  let service: TermOfConditionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TermOfConditionService],
    }).compile();

    service = module.get<TermOfConditionService>(TermOfConditionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
