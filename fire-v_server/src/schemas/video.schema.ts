import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from "./user.schema";
import mongoose, { Document } from 'mongoose';
import { IsNotEmpty } from 'class-validator';


@Schema({
    timestamps: true
})

export class Video {

    @IsNotEmpty()
    @Prop()
    title: string;

    @Prop({ default: "" })
    description: string;

    @Prop({ default: 0 })
    views: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
    author: User;

    @Prop([String])
    hashtags: string[];

    @Prop()
    url: string;

    @IsNotEmpty()
    @Prop()
    image_url: string;

    @Prop()
    type: string;

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
export type VideoDocument = Video & Document;
export const VideoSchema = SchemaFactory.createForClass(Video);