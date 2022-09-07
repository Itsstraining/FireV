import { CommentState } from './../states/comment.state';
import { Comment } from './../models/comment.model';
import * as CommentActions from './../actions/comment.action';
import { createReducer, on } from '@ngrx/store';
const initialState: CommentState ={
    _id: '',
    idToken: '',
    commentList: [],
    commentLoad: <Comment>{},
    isLoading: false,
    error: ''
}

export const commentReducer = createReducer(
    initialState,
    on(CommentActions.createComment, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            idToken: action.idToken,
            commentLoad: action.comment,
            _id: action.id

        }
    }),
    on(CommentActions.createCommentSucceed, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            commentLoad: <Comment>{}
        }
        console.log(action.type, action.comment);
        return newState;
    }),
    on(CommentActions.createCommentFailed, (state, action) => {
        console.log(action.error)
        return {
            ...state,
            error: action.error,
            isLoading: false
        }
    })
);
