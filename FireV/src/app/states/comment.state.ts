import {Comment} from '../models/comment.model';

export interface CommentState{
    _id: string;
    idToken: string;
    commentList: Comment[];
    commentLoad: Comment;
    isLoading: boolean;
    error: string;
}
