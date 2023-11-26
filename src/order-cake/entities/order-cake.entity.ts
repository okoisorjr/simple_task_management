import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class OrderCake {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'cake' })
  cake: string;

  @Prop()
  specialMessage: string;

  @Prop()
  colorPreference: string;

  @Prop({ default: false })
  birthdayCard: boolean;

  @Prop({ default: false })
  wine: boolean;

  @Prop({ default: 1 })
  cakeCount: number;

  @Prop()
  grandPrice: number;

  @Prop()
  reference: string;

  @Prop()
  paymentStatus: boolean;
}
