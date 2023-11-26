import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type CakeDocument = mongoose.HydratedDocument<Cake>;

@Schema({ timestamps: true })
export class Cake {
  @Prop()
  cakeName: string;

  @Prop()
  description: string;

  @Prop()
  imageURL: String;

  @Prop()
  minPrice: number;

  @Prop()
  maxPrice: number;

  @Prop()
  category: string;

}

export const CakeSchema = SchemaFactory.createForClass(Cake);
