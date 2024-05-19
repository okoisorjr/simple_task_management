import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './entities/task.entity';
import { TasksGateway } from './tasks-gateway/tasks.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  exports: [TasksGateway],
  controllers: [TasksController],
  providers: [TasksService, TasksGateway],
})
export class TasksModule {}
