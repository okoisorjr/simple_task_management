import { Test, TestingModule } from '@nestjs/testing';
import { OrderCakeController } from './order-cake.controller';
import { OrderCakeService } from './order-cake.service';

describe('OrderCakeController', () => {
  let controller: OrderCakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCakeController],
      providers: [OrderCakeService],
    }).compile();

    controller = module.get<OrderCakeController>(OrderCakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
