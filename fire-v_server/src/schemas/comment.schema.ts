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

  @Prop({ default: 0 })
  like: number;

  @Prop({ default: 0 })
  dislike: number;

  @Prop({ default: false })
  isHidden: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  likeList: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }] })
  dislikeList: User[];

}
export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);