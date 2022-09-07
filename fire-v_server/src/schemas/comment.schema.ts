import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { IsNotEmpty } from 'class-validator';
import { Video } from './video.schema';

@Schema({
  timestamps: true
})
export class Comment {

  @IsNotEmpty()
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'comments' })
  replyTo: Comment;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'videos' })
  video: Video;

  @Prop({default: false})
  isHidden: boolean;
}
export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);