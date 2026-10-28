import { Test, TestingModule } from '@nestjs/testing';
import { PavillonService } from './pavillon.service';

describe('PavillonService', () => {
  let service: PavillonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PavillonService],
    }).compile();

    service = module.get<PavillonService>(PavillonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
