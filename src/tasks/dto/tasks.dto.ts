import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TasksDto {
  @ApiProperty({
    example: '6648c39dd7d9a29f8e0110ff',
  })
  @IsString()
  _id: string;

  @ApiProperty({
    example: 'string',
  })
  @IsString()
  task: string;

  @ApiProperty({
    example: false,
  })
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty({
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    example: '6648c39dd7d9a29f8e0110ff',
  })
  @IsMongoId()
  user_id: string;
}
