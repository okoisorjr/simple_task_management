import { Test, TestingModule } from '@nestjs/testing';
import { NewCakeService } from './new-cake.service';

describe('NewCakeService', () => {
  let service: NewCakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewCakeService],
    }).compile();

    service = module.get<NewCakeService>(NewCakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
