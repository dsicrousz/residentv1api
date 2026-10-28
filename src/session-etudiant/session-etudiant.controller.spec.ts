import { Test, TestingModule } from '@nestjs/testing';
import { SessionEtudiantController } from './session-etudiant.controller';
import { SessionEtudiantService } from './session-etudiant.service';

describe('SessionEtudiantController', () => {
  let controller: SessionEtudiantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionEtudiantController],
      providers: [SessionEtudiantService],
    }).compile();

    controller = module.get<SessionEtudiantController>(SessionEtudiantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
