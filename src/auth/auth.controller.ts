import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('yvette_baker/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('/register')
  register(@Body() new_user: CreateUserDto) {
    return this.authService.create(new_user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/refresh-token')
  refreshToken(@Request() req) {
    return this.authService.refresh(req.header);
  }
}
