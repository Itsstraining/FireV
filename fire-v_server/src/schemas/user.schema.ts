import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Schema({
  timestamps: true
})
export class User {
  
  @IsNotEmpty()
  @Prop()
  name: string;

  @Prop({
    default: '', //default image
  })
  avatar: string;

  @Prop({ default: 0 })
  subscribers: number;

  @Prop()
  subscriberList: string[];

  @IsEmail()
  @Prop()
  email: string;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);