import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewCakeModule } from './new-cake/new-cake.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrderCakeModule } from './order-cake/order-cake.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users/users.controller';
import { NewCakeController } from './new-cake/new-cake.controller';
import { OrderCakeController } from './order-cake/order-cake.controller';

@Module({
  imports: [
    NewCakeModule,
    AuthModule,
    UsersModule,
    OrderCakeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        UsersController,
        NewCakeController,
        OrderCakeController
      );

    consumer.apply().forRoutes();
  }
}
