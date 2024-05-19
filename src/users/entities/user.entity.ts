import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from 'src/Shared/rolesEnum';

@Schema({ timestamps: true })
export class User {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop({ required: true, default: Roles.CUSTOMER })
  role: Roles;

  @Prop()
  refresh_token: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
