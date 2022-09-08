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
    }),
    on(CommentActions.getComment, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            _id: action.id
        }
    }),
    on(CommentActions.getCommentSucceed, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            commentList: action.comment
        }
        console.log(action.comment);
        return newState;
    }),
    on(CommentActions.getCommentFailed, (state, action) => {
        console.log(action.error)
        return {
            ...state,
            error: action.error,
            isLoading: false
        }
    }),
    on(CommentActions.updateLike, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            idToken: action.idToken,
            _id: action.id
        }
    }),
    on(CommentActions.updateLikeSucceed, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            //commentLoad: action.comment
            _id: ""
        }
        console.log(action.type);
        return newState;
    }),
    on(CommentActions.updateLikeFailed, (state, action) => {
        console.log(action.error)
        return {
            ...state,
            error: action.error,
            isLoading: false,
            _id: ""
        }
    }),
    on(CommentActions.updateDislike, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            idToken: action.idToken,
            _id: action.id
        }
    }),
    on(CommentActions.updateDislikeSucceed, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            //commentLoad: action.comment
            _id: ""
        }
        console.log(action.type);
        return newState;
    }),
    on(CommentActions.updateDislikeFailed, (state, action) => {
        console.log(action.error)
        return {
            ...state,
            error: action.error,
            isLoading: false,
            _id: ""
        }
    }),
   on(CommentActions.updateUnlike, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            idToken: action.idToken,
            _id: action.id
        }
    }),
    on(CommentActions.updateUnlikeSucceed, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            //commentLoad: action.comment
            _id: ""
        }
        console.log(action.type);
        return newState;
    }),
    on(CommentActions.updateUnlikeFailed, (state, action) => {
        console.log(action.error)
        return {
            ...state,
            error: action.error,
            isLoading: false,
            _id: ""
        }
    }),
    on(CommentActions.updateUndislike, (state, action) => {
        console.log(action.type)
        return {
            ...state,
            isLoading: true,
            idToken: action.idToken,
            _id: action.id
        }
    }),
    on(CommentActions.updateUndislikeSucceed, (state, action) => {
        let newState = {
            ...state,
            isLoading: false,
            //commentLoad: action.comment
            _id: ""
        }
        console.log(action.type);
        return newState;
    }),
    on(CommentActions.updateUndislikeFailed, (state, action) => {
        console.log(action.error)
        return {
            ...state,
            error: action.error,
            isLoading: false,
            _id: ""
        }
    })
);
