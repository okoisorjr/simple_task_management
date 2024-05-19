import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { TasksService } from '../tasks.service';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'tasks',
})
export class TasksGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(TasksGateway.name);
  constructor(private readonly tasksService: TasksService) {}

  @WebSocketServer() server: Namespace;

  afterInit(server: any) {
    this.logger.log('Websocket gateway initialized');
  }

  async handleConnection(client: Socket) {
    const sockets = this.server.sockets;
    const tasks = await this.tasksService.getTasks();

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    //throw new Error('Method not implemented.');

    this.server.emit('tasks', tasks);
  }

  async handleDisconnect(client: Socket) {
    //throw new Error('Method not implemented.');
    this.server.emit('disconnect', `client ${client.id} has disconnected!`);
  }

  emitEventToClients(data: any) {
    this.server.emit('task_updates', data);
  }
}
