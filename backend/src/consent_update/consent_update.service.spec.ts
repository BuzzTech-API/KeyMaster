import { Test, TestingModule } from '@nestjs/testing';
import { ConsentUpdateService } from './consent_update.service';

describe('ConsentUpdateService', () => {
  let service: ConsentUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsentUpdateService],
    }).compile();

    service = module.get<ConsentUpdateService>(ConsentUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
