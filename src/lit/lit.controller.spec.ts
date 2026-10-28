import { Test, TestingModule } from '@nestjs/testing';
import { LitController } from './lit.controller';
import { LitService } from './lit.service';

describe('LitController', () => {
  let controller: LitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LitController],
      providers: [LitService],
    }).compile();

    controller = module.get<LitController>(LitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
