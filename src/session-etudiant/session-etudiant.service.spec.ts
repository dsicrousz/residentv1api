import { Test, TestingModule } from '@nestjs/testing';
import { SessionEtudiantService } from './session-etudiant.service';

describe('SessionEtudiantService', () => {
  let service: SessionEtudiantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionEtudiantService],
    }).compile();

    service = module.get<SessionEtudiantService>(SessionEtudiantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
