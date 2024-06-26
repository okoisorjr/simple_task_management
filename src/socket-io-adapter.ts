import { INestApplicationContext, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIOAdapter extends IoAdapter {
  private readonly logger = new Logger(SocketIOAdapter.name);
  constructor(
    private app: INestApplicationContext,
    private configService: ConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const clientPort = parseInt(this.configService.get('PORT'));

    const cors = {
      origin: [
        `http://localhost:${clientPort}`,
        new RegExp(`/^http:\/\/192.\.168\.1\.([1-9][1-9]\d):${clientPort}$/`),
      ],
    };

    this.logger.log('Configuring socketIO server with custom cors option', {
      cors,
    });

    const optionsWithCors: ServerOptions = {
      ...options,
      cors,
    };

    return super.createIOServer(port, optionsWithCors);
  }
}
