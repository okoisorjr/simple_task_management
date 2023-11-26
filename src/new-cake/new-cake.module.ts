import { Module } from '@nestjs/common';
import { NewCakeService } from './new-cake.service';
import { NewCakeController } from './new-cake.controller';
import { CakeSchema, Cake } from './entities/new-cake.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cake.name, schema: CakeSchema }]),
  ],
  controllers: [NewCakeController],
  providers: [NewCakeService],
})
export class NewCakeModule {}
