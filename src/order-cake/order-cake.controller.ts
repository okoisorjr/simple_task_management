import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderCakeService } from './order-cake.service';
import { CreateOrderCakeDto } from './dto/create-order-cake.dto';
import { UpdateOrderCakeDto } from './dto/update-order-cake.dto';

@Controller('order-cake')
export class OrderCakeController {
  constructor(private readonly orderCakeService: OrderCakeService) {}

  @Post()
  create(@Body() createOrderCakeDto: CreateOrderCakeDto) {
    return this.orderCakeService.create(createOrderCakeDto);
  }

  @Get()
  findAll() {
    return this.orderCakeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderCakeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderCakeDto: UpdateOrderCakeDto) {
    return this.orderCakeService.update(+id, updateOrderCakeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderCakeService.remove(+id);
  }
}
