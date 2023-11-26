import { Injectable } from '@nestjs/common';
import { CreateOrderCakeDto } from './dto/create-order-cake.dto';
import { UpdateOrderCakeDto } from './dto/update-order-cake.dto';

@Injectable()
export class OrderCakeService {
  create(createOrderCakeDto: CreateOrderCakeDto) {
    return 'This action adds a new orderCake';
  }

  findAll() {
    return `This action returns all orderCake`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderCake`;
  }

  update(id: number, updateOrderCakeDto: UpdateOrderCakeDto) {
    return `This action updates a #${id} orderCake`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderCake`;
  }
}
