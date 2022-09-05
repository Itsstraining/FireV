import { Injectable, Param} from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from 'src/schemas/user.schema';

import {
    Video,
    VideoDocument,

} from "src/schemas/video.schema";

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async creatVideo(video: Video, user: any) {
        try {
            const newVideo = new this.videoModel(video);
            const user_Indb = await this.userModel.findOne({
                email: user.email,
            }).exec();
            newVideo.author = user_Indb._id;
            const _video = await newVideo.save();
            return _video;
        } catch (err) {
            console.log(err);
        }
    }

    async findByVideoId(_id: string) {
        try{
            return await this.videoModel.findOne({ _id: _id })
            .populate('author', 'email avatar _id name subscribers',this.userModel);
        }catch(err){
            console.log(err);
        }
       
    }

    async findAllVideo() {
        return await this.videoModel
        .find({})
        .select('-description -likeList -dislikeList -__v -like -dislike -hashtags -url') 
        .populate('author', 'email avatar _id name subscribers',this.userModel);
    }

    async findAllExceptId(id: string) {
        return await this.videoModel
        .find({_id: {$ne: id}})
        .select('-description -likeList -dislikeList -__v -like -dislike -hashtags -url') 
        .populate('author', 'email avatar _id name subscribers',this.userModel);
    }

    async update(id: String) {
        const _video = await this.videoModel.findOne({_id: id});
        _video.views += 1;
        return await this.videoModel.findOneAndUpdate({_id: id}, _video, {new: true})
        .populate('author', 'email avatar _id name subscribers',this.userModel);
    }

    async updateLike(id: String, user: any) {
        const _video = await this.videoModel.findOne({_id: id});
        const user_Indb = await this.userModel.findOne({
            email: user.email,
        }).exec();
        const idOfUser = user_Indb._id;

        if(_video.dislikeList.includes(user_Indb._id)){
            const index = _video.dislikeList.indexOf(idOfUser);
            _video.dislikeList.splice(index, 1);
            _video.dislike -= 1;
        }
        if(_video.likeList.includes(user_Indb._id)){
            const index = _video.likeList.indexOf(idOfUser);
            console.log(index);
            _video.likeList.splice(index, 1);
            _video.like -= 1;
        }else{
            _video.likeList.push(user_Indb._id);
            _video.like += 1;
        }
        const tam = await _video.save();
        return tam;
    }

    async updateDislike(id: String, user: any) {
        const _video = await this.videoModel.findOne({_id: id});
        const user_Indb = await this.userModel.findOne({
            email: user.email,
        }).exec();
        const idOfUser = user_Indb._id;

        if(_video.likeList.includes(user_Indb._id)){
            const index = _video.likeList.indexOf(idOfUser);
            _video.likeList.splice(index, 1);
            _video.like -= 1;
        }
        if(_video.dislikeList.includes(user_Indb._id)){
            const index = _video.dislikeList.indexOf(idOfUser);
            _video.dislikeList.splice(index, 1);
            _video.dislike -= 1;
        }else{
            _video.dislikeList.push(user_Indb._id);
            _video.dislike += 1;
        }
        const tam = await _video.save();
        return tam;
    }
}
