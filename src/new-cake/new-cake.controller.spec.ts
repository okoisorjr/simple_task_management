import { Test, TestingModule } from '@nestjs/testing';
import { NewCakeController } from './new-cake.controller';
import { NewCakeService } from './new-cake.service';

describe('NewCakeController', () => {
  let controller: NewCakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewCakeController],
      providers: [NewCakeService],
    }).compile();

    controller = module.get<NewCakeController>(NewCakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
