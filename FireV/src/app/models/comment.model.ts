import { User } from "./user.model";

export interface Comment{
    _id: string;
    content: string;
    replyTo: Comment;
    author: User;
    createdAt: string;
    commentList: Comment[];
    isHidden: boolean;
    timeUp: string;
    likeList: string[];
    dislikeList: string[];
    like: number;
    dislike: number;
}
