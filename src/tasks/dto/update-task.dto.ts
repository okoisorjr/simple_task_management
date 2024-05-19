import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    example: 'The task to be executed',
    required: true
  })
  @IsString()
  task: string;

  @ApiProperty({
    example: false,
    required: true
  })
  @IsBoolean()
  isCompleted: string

  @ApiProperty({
    example: '66475a390b379073d830f117',
    required: true
  })
  @IsMongoId()
  user_id: string;
}
