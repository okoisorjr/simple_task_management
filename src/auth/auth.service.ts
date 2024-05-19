import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectModel(User.name) readonly userModel: mongoose.Model<User>,
  ) {

  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async login(user: LoginDto) {
    const currentUser = await this.usersService.getUser(user.email);
    const payload = { email: currentUser.email, sub: currentUser.id };
    const { access_token, refresh_token } = await this.generateTokens(payload);
    await this.userModel.findOneAndUpdate(
      { email: currentUser.email },
      { refreshToken: refresh_token },
      { upsert: true, new: true },
    );
    return {
      currentUser,
      access_token,
    };
  }

  async generateTokens(payload: any) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      }),
    ]);
    return { access_token, refresh_token };
  }

  /* async refresh(payload: any) {
    
    const {access_token, refresh_token} = await this.generateTokens(payload);
  } */
}
