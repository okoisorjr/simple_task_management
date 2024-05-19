import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SocketIOAdapter } from './socket-io-adapter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT'));
  const clientPort = parseInt(configService.get('CLIENT_PORT'));

  const options = new DocumentBuilder()
    .setTitle('A SIMPLE TASK MANAGEMENT SYSTEM')
    .setDescription(
      `This is a simple api which was built as a recruitment exercise for NIYO GROUP \n 
      To get started consuming this API begin the routes with http://localhost:5000 appended with any of the endpoints listed below`,
    )
    .setVersion('1.0')
    .addServer(`http://localhost:${port}`, 'Local environment')
    .addTag('')
    .addBearerAuth()
    .build();

  const documment = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, documment);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      `http://localhost:${clientPort}`,
      new RegExp(`/^http:\/\/192.\.168\.1\.([1-9][1-9]\d):${clientPort}$/`),
    ],
  });
  app.use(cookieParser());
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(port || 5000);
}
bootstrap();
