import { Test, TestingModule } from '@nestjs/testing';
import { AnneeUniversitaireService } from './annee_universitaire.service';

describe('AnneeUniversitaireService', () => {
  let service: AnneeUniversitaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnneeUniversitaireService],
    }).compile();

    service = module.get<AnneeUniversitaireService>(AnneeUniversitaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
