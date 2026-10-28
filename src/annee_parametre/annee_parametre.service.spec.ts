import { Test, TestingModule } from '@nestjs/testing';
import { AnneeParametreService } from './annee_parametre.service';

describe('AnneeParametreService', () => {
  let service: AnneeParametreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnneeParametreService],
    }).compile();

    service = module.get<AnneeParametreService>(AnneeParametreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
