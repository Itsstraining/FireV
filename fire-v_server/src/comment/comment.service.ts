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
            // console.log(newComment);
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

    async updateLike(id: string, user: any){
        const _comment = await this.commentModel.findOne({_id: id});
        const user_Indb = await this.userModel.findOne({
            email: user.email,
        }).exec();
        const idOfUser = user_Indb._id;

        if(_comment.dislikeList.includes(user_Indb._id)){
            const index = _comment.dislikeList.indexOf(idOfUser);
            _comment.dislikeList.splice(index, 1);
            _comment.dislike -= 1;
        }
        if(_comment.likeList.includes(user_Indb._id)){
            const index = _comment.likeList.indexOf(idOfUser);
            console.log(index);
            _comment.likeList.splice(index, 1);
            _comment.like -= 1;
        }else{
            _comment.likeList.push(user_Indb._id);
            _comment.like += 1;
        }
        const tam = await _comment.save();
        return tam;
    }

    async updateDislike(id: string, user: any){
        const _comment = await this.commentModel.findOne({_id: id});
        const user_Indb = await this.userModel.findOne({
            email: user.email,
        }).exec();
        const idOfUser = user_Indb._id;

        if(_comment.likeList.includes(user_Indb._id)){
            const index = _comment.likeList.indexOf(idOfUser);
            _comment.likeList.splice(index, 1);
            _comment.like -= 1;
        }
        if(_comment.dislikeList.includes(user_Indb._id)){
            const index = _comment.dislikeList.indexOf(idOfUser);
            _comment.dislikeList.splice(index, 1);
            _comment.dislike -= 1;
        }else{
            _comment.dislikeList.push(user_Indb._id);
            _comment.dislike += 1;
        }
        const tam = await _comment.save();
        return tam;
    }

    async deleteAllCommentFromVid(video_id:string){
        await this.commentModel.deleteMany({video : Object(video_id)}).exec();
    }

}   

