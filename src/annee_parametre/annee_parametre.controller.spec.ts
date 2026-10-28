import { Test, TestingModule } from '@nestjs/testing';
import { AnneeParametreController } from './annee_parametre.controller';
import { AnneeParametreService } from './annee_parametre.service';

describe('AnneeParametreController', () => {
  let controller: AnneeParametreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnneeParametreController],
      providers: [AnneeParametreService],
    }).compile();

    controller = module.get<AnneeParametreController>(AnneeParametreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
