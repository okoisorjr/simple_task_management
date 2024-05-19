import { IsEnum, IsNotEmpty } from 'class-validator';
import { Roles } from 'src/Shared/rolesEnum';
import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty({
    example: '6648c39dd7d9a29f8e0110ff'
  })
  _id: 'string';

  @ApiProperty({
    example: 'string',
  })
  phone: string;

  @ApiProperty({
    example: 'string',
  })
  fullname: string;

  @ApiProperty({
    example: 'string',
  })
  email: string;

  @ApiProperty({
    example: 'string',
  })
  access_token: string;

  @ApiProperty({
    example: 'string',
  })
  refresh_token: string;

  @ApiProperty({
    example: 'ADMIN',
  })
  role: Roles;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
  })
  updatedAt: Date;
}
