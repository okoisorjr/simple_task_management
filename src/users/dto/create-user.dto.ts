import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Roles } from 'src/Shared/rolesEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
  fullname: string;

  @ApiProperty({
    example: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;
}
