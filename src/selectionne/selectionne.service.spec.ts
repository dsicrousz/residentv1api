import { Test, TestingModule } from '@nestjs/testing';
import { SelectionneService } from './selectionne.service';

describe('SelectionneService', () => {
  let service: SelectionneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectionneService],
    }).compile();

    service = module.get<SelectionneService>(SelectionneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
