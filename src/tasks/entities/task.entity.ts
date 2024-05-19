import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  task: string;

  @Prop({ required: true, default: false })
  isCompleted: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
