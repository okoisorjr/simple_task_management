import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { ResourceCreated } from 'src/Shared/resource-created';
import { TasksGateway } from './tasks-gateway/tasks.gateway';

@Injectable()
export class TasksService {
  constructor(
    //private readonly taskGateway: TasksGateway,
    @InjectModel(Task.name) private readonly taskModel: mongoose.Model<Task>,
  ) {}

  async getTasks() {
    const tasks = await this.taskModel.find().sort({ createdAt: 'desc' });

    //this.taskGateway.emitEventToClients(tasks);
    return tasks;
  }

  async create(createTaskDto: CreateTaskDto): Promise<ResourceCreated> {
    try {
      const task = await this.taskModel.create(createTaskDto);
      return new ResourceCreated(task._id.toString());
    } catch (error) {
      throw new HttpException(
        'We are so sorry we ran into a server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().sort({ createdAt: 'desc' });

    if (tasks.length < 1) {
      throw new HttpException(
        'There are currently no tasks!',
        HttpStatus.CONTINUE,
      );
    }

    return tasks;
  }

  async findMyTasks(user_id: string): Promise<Task[]> {
    const tasks = await this.taskModel
      .find({ user_id: user_id })
      .sort({ createdAt: 'desc' });

    if (tasks.length < 1) {
      throw new HttpException(
        'You currently have no tasks!',
        HttpStatus.CONTINUE,
      );
    }

    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async findMyTask(id: string, user_id: string): Promise<Task> {
    const task = await this.taskModel.findOne({
      $and: [{ _id: id, user_id: user_id }],
    });

    if (!task) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResourceCreated> {
    const task = await this.taskModel.findOneAndUpdate(
      { $and: [{ _id: id, user_id: updateTaskDto.user_id }] },
      updateTaskDto,
      {
        new: true,
      },
    );

    if (!task) {
      throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
    }

    return new ResourceCreated(task._id.toString());
  }

  async remove(id: string): Promise<ResourceCreated> {
    const task = await this.taskModel.findByIdAndDelete(id);

    if (!task) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return new ResourceCreated(task.id);
  }

  async deleteMyTask(id: string, user_id: string): Promise<ResourceCreated> {
    const task = await this.taskModel.findOneAndDelete({
      $and: [{ _id: id, user_id: user_id }],
    });

    if (!task) {
      throw new HttpException('Resource not found!', HttpStatus.NOT_FOUND);
    }

    return new ResourceCreated(task.id);
  }
}
