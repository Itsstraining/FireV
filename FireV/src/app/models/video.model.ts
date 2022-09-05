import { User } from "./user.model";
import { Comment } from "./comment.model";

export interface Video{
    _id : string;
    title: string;
    description: string;
    image_url: string;
    url: string;
    like: number;
    dislike: number;
    views: number;
    author: User;
    timeUp: string;
    createdAt: string;
    hour: number;
    minute: number;
    second: number;
    day: number;
    comments: Comment[];
    isHidden: boolean;
    hashtags: string[];
    likeList: string[];
    dislikeList: string[];
    type: string;
}

