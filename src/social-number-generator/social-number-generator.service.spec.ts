import { Test, TestingModule } from '@nestjs/testing';
import { SocialNumberGeneratorService } from './social-number-generator.service';

describe('SocialNumberGeneratorService', () => {
  let service: SocialNumberGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialNumberGeneratorService],
    }).compile();

    service = module.get<SocialNumberGeneratorService>(SocialNumberGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
