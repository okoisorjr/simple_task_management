import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderCakeDto } from './create-order-cake.dto';

export class UpdateOrderCakeDto extends PartialType(CreateOrderCakeDto) {}
