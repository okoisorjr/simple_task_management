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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksDto } from './dto/tasks.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ResourceCreated } from 'src/Shared/resource-created';
import { TasksGateway } from './tasks-gateway/tasks.gateway';

@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('tsk_mgt/api/v1/tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private taskGateway: TasksGateway,
  ) {}

  @ApiResponse({
    status: 200,
    description:
      'his endpoint is responsible for the creation of a new task in the database.',
    type: ResourceCreated,
  })
  @ApiOperation({ summary: 'create a new task' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: CreateTaskDto, description: '' })
  @Post('new-task')
  async create(@Body() createTaskDto: CreateTaskDto) {
    const tasks = await this.tasksService.create(createTaskDto);
    const updated_tasklist = await this.tasksService.getTasks();
    this.taskGateway.emitEventToClients(updated_tasklist); // update client with most recent data using websocket
    return tasks;
  }

  /** Retrieve all tasks */
  @ApiResponse({
    status: 200,
    description:
      'This endpoint is responsible for retrieving all the tasks that has been created.',
    type: [TasksDto],
  })
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  /** Retrieve all user tasks */
  @ApiResponse({
    status: 200,
    description:
      'This endpoint is responsible for retrieving all the tasks that has been created by a single user.',
    type: [TasksDto],
  })
  @ApiOperation({ summary: 'List of all tasks belonging to a single user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get('users/:user_id')
  findMyTasks(@Param('user_id') user_id: string) {
    return this.tasksService.findMyTasks(user_id);
  }

  /** Retrieve a single task */
  @ApiResponse({
    status: 200,
    description: 'This endpoint is responsible for retrieving a single task.',
    type: TasksDto,
  })
  @ApiOperation({ summary: 'View any task' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  /** Retrieve a single task for a user */
  @ApiResponse({
    status: 200,
    description:
      'This endpoint is responsible for retrieving a single task belonging to a user.',
    type: TasksDto,
  })
  @ApiOperation({ summary: 'View a task belonging to a user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Get(':id/users/:user_id')
  findMyTask(@Param('id') id: string, @Param('user_id') user_id: string) {
    return this.tasksService.findMyTask(id, user_id);
  }

  /** Update a single task */
  @ApiResponse({
    status: 200,
    description: 'This endpoint is responsible for updating a task.',
    type: ResourceCreated,
  })
  @ApiOperation({ summary: 'Update a task beloging to a user' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({
    type: UpdateTaskDto,
    description:
      'To update a task, you are expected to provide values for each field. You can only update a task that was created by you and you must be signed in to do so.',
    required: true,
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updated_task_id = await this.tasksService.update(id, updateTaskDto);
    const updated_tasklist = await this.tasksService.getTasks();
    this.taskGateway.emitEventToClients(updated_tasklist); // update client with most recent data using websocket
    return updated_task_id;
  }

  /** Delete a single task for a user */
  @ApiResponse({
    status: 200,
    description: `This endpoint is responsible for deleting a task. 
        A task can only be deleted using this endpoint when you are signed in 
        and you are the creator of the task being deleted`,
    type: ResourceCreated,
  })
  @ApiOperation({ summary: 'delete a task for a user' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id/users/:user_id')
  remove(@Param('id') id: string, @Param('user_id') user_id: string) {
    return this.tasksService.deleteMyTask(id, user_id);
  }

  /** Delete a single task for a user */
  @ApiResponse({
    status: 200,
    description: `This endpoint is responsible for deleting a task. 
        A task can only be deleted using this endpoint when you are signed in 
        and you are the creator of the task being deleted`,
    type: ResourceCreated,
  })
  @ApiOperation({ summary: 'delete any task' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
