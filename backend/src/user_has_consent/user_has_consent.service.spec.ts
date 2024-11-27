import { Test, TestingModule } from '@nestjs/testing';
import { UserHasConsentService } from './user_has_consent.service';

describe('UserHasConsentService', () => {
  let service: UserHasConsentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHasConsentService],
    }).compile();

    service = module.get<UserHasConsentService>(UserHasConsentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
