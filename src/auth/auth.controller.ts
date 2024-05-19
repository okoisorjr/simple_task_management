import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UsersDto } from 'src/users/dto/users.dto';
import { ResourceCreated } from 'src/Shared/resource-created';

@ApiTags('Auth')
@Controller('tsk_mgt/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'Logged in successfully.',
    type: UsersDto,
  })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: LoginDto,
    description:
      'To login kindly provide the required fields. email and password.',
  })
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.body);
  }

  @ApiResponse({
    status: 201,
    type: ResourceCreated,
    description: 'The record was created successfully.',
  })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for creating a new user object.',
  })
  @Post('/register')
  register(@Body() new_user: CreateUserDto) {
    return this.authService.create(new_user);
  }

  /* @UseGuards(AuthGuard('jwt'))
  @Post('/refresh-token')
  refreshToken(@Request() req) {
    return this.authService.refresh(req.header);
  } */
}
