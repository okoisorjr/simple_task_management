import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
  ) {}

  async validateUser(email, password) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new HttpException(
        'Incorrect email or password!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    } else {
      throw new HttpException(
        'Incorrect email or password!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getUser(email) {
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.fullname.trim();
    createUserDto.email.trim();
    createUserDto.password.trim();
    createUserDto.phone.trim();

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10); // HASH CUSTOMER PASSWORD

    try {
      const new_user = await this.userModel.create(createUserDto);
      return new_user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updated = await this.userModel.findByIdAndUpdate(
        { id: id },
        updateUserDto,
        { upsert: true, new: true },
      );
      return updated;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    const deleted_id = await this.userModel.findByIdAndDelete(id);
    return { id: deleted_id.id };
  }
}
