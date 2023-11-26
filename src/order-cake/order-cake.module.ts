import { Module } from '@nestjs/common';
import { OrderCakeService } from './order-cake.service';
import { OrderCakeController } from './order-cake.controller';

@Module({
  controllers: [OrderCakeController],
  providers: [OrderCakeService],
})
export class OrderCakeModule {}
