import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  fullname: string;
}
