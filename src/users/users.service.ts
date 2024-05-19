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
import { ResourceCreated } from 'src/Shared/resource-created';

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
    const user = await this.userModel
      .findOne({ email: email })
      .select('fullname email phone role refreshToken');

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

      return new ResourceCreated(new_user._id.toString()); //{ fullname: new_user.fullname, email: new_user.email, phone: new_user.phone, role: new_user.role };
    } catch (error) {
      throw new HttpException(
        'So sorry, we ran into a server problem!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel
        .find()
        .select('fullname email phone role refresh_token createdAt updatedAt')
        .sort({ createdAt: 'desc' });

      if (users.length < 1) {
        throw new HttpException(
          'There are currently no users!',
          HttpStatus.NOT_FOUND,
        );
      }

      return users;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel
        .findById(id)
        .select('fullname email phone role refresh_token createdAt updatedAt');

      if (!user) {
        throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(
        'So sorry, we ran into a server problem!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResourceCreated> {
    try {
      const updated = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto,
        { upsert: true, new: true },
      );

      if (!updated) {
        throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
      }

      return new ResourceCreated(updated._id.toString());
    } catch (error) {
      throw new HttpException(
        'So sorry, we ran into a server error while updating your information!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<ResourceCreated> {
    const deleted_task = await this.userModel.findByIdAndDelete(id);

    if (!deleted_task) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return new ResourceCreated(deleted_task.id);
  }
}
