import { Test, TestingModule } from '@nestjs/testing';
import { PayementController } from './payement.controller';
import { PayementService } from './payement.service';

describe('PayementController', () => {
  let controller: PayementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayementController],
      providers: [PayementService],
    }).compile();

    controller = module.get<PayementController>(PayementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
