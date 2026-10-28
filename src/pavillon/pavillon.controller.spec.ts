import { Test, TestingModule } from '@nestjs/testing';
import { PavillonController } from './pavillon.controller';
import { PavillonService } from './pavillon.service';

describe('PavillonController', () => {
  let controller: PavillonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PavillonController],
      providers: [PavillonService],
    }).compile();

    controller = module.get<PavillonController>(PavillonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
