import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User, UserSchema } from './entities/user.entity';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResourceCreated } from 'src/Shared/resource-created';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tsk_mgt/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /* @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  } */

  /** Retrieve all users */
  @ApiResponse({
    status: 200,
    description: 'This endpoint is responsible for the retrieval of all users.',
    type: [UsersDto],
  })
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /** Retrieve details of a single user */
  @ApiResponse({
    status: 200,
    description:
      'This endpoint is responsible for retrieving the information of a single user.',
    type: UsersDto,
  })
  @ApiOperation({ summary: 'View user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /** Update the details of a single user */
  @ApiResponse({
    status: 200,
    description: 'This endpoint is responsible for updating a users detail.',
    type: ResourceCreated,
  })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({
    type: UpdateUserDto,
    description:
      'To update a Users information, you are required to provide values for each field',
    required: true,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /** Delete a user */
  @ApiResponse({
    status: 200,
    description: 'This endpoint is responsible for deleting a user.',
    type: ResourceCreated,
  })
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
