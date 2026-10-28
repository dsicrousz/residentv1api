import { Test, TestingModule } from '@nestjs/testing';
import { AnneeUniversitaireController } from './annee_universitaire.controller';
import { AnneeUniversitaireService } from './annee_universitaire.service';

describe('AnneeUniversitaireController', () => {
  let controller: AnneeUniversitaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnneeUniversitaireController],
      providers: [AnneeUniversitaireService],
    }).compile();

    controller = module.get<AnneeUniversitaireController>(AnneeUniversitaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
