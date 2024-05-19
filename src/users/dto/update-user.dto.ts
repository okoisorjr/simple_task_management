import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'string',
    required: true,
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'string',
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'string',
    required: true,
  })
  @IsNotEmpty()
  fullname: string;
}
