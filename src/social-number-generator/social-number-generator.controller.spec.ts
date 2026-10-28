import { Test, TestingModule } from '@nestjs/testing';
import { SocialNumberGeneratorController } from './social-number-generator.controller';
import { SocialNumberGeneratorService } from './social-number-generator.service';

describe('SocialNumberGeneratorController', () => {
  let controller: SocialNumberGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialNumberGeneratorController],
      providers: [SocialNumberGeneratorService],
    }).compile();

    controller = module.get<SocialNumberGeneratorController>(SocialNumberGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
