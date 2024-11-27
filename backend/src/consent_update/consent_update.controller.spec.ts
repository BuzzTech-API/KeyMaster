import { Test, TestingModule } from '@nestjs/testing';
import { ConsentUpdateController } from './consent_update.controller';
import { ConsentUpdateService } from './consent_update.service';

describe('ConsentUpdateController', () => {
  let controller: ConsentUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsentUpdateController],
      providers: [ConsentUpdateService],
    }).compile();

    controller = module.get<ConsentUpdateController>(ConsentUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
