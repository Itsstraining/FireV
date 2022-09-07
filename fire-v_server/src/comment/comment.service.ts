import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Video, VideoDocument } from 'src/schemas/video.schema';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createComment (comment: Comment, user: any, id: string){
        try{
            const newComment = new this.commentModel(comment);
            const author_Indb = await this.userModel.findOne({
                email: user.email,
            }).exec();
            newComment.author = author_Indb._id;
            const video_indb = await this.videoModel.findOne({
                _id: id,
            }).exec();
            newComment.video = video_indb._id;
            const _comment = await newComment.save();
            console.log(newComment);
            return _comment;
        }
        catch(err){
            console.log(err);
        }
    }
    async findAllComment(id: string){
        return await this.commentModel.find({video: id})
        .populate('author', 'email avatar _id name subscribers',this.userModel)
        // .populate('replyTo', 'author content createdAt video');
    }

}   

