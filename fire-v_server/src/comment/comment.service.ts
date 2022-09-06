import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from 'src/schemas/comment.schema';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

    async creatComment(comment: Comment, videoId: string, email: string) {
        
        let creatComment = new this.commentModel(comment);
        await creatComment.save();
    }

    async findAllComment() {
        return await this.commentModel.find();
    }

    async deleteComment(id: string) {
        return await this.commentModel.findByIdAndDelete(id);
    }
}   

