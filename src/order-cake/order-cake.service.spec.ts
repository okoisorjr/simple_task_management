import { Test, TestingModule } from '@nestjs/testing';
import { OrderCakeService } from './order-cake.service';

describe('OrderCakeService', () => {
  let service: OrderCakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCakeService],
    }).compile();

    service = module.get<OrderCakeService>(OrderCakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
