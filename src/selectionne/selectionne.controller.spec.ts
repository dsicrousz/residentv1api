import { Test, TestingModule } from '@nestjs/testing';
import { SelectionneController } from './selectionne.controller';
import { SelectionneService } from './selectionne.service';

describe('SelectionneController', () => {
  let controller: SelectionneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectionneController],
      providers: [SelectionneService],
    }).compile();

    controller = module.get<SelectionneController>(SelectionneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
