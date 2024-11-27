import { Test, TestingModule } from '@nestjs/testing';
import { UserHasConsentController } from './user_has_consent.controller';
import { UserHasConsentService } from './user_has_consent.service';

describe('UserHasConsentController', () => {
  let controller: UserHasConsentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHasConsentController],
      providers: [UserHasConsentService],
    }).compile();

    controller = module.get<UserHasConsentController>(UserHasConsentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
