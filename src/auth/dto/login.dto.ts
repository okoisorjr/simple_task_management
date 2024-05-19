import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
  password: string;
}
