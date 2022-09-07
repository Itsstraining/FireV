import { createAction, props } from "@ngrx/store";
import { Comment } from "../models/comment.model";

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ id: string, idToken: string, comment: Comment }>()
);
export const createCommentSucceed = createAction(
  '[Comment] Create Comment Succeed',
  props<{ comment: Comment }>()
);
export const createCommentFailed = createAction(
  '[Comment] Create Comment Failed',
  props<{ error: string }>()
);

//get comment list
export const getComment = createAction(
  '[Comment] Get Comment',
  props<{ id: string }>()
);
export const getCommentSucceed = createAction(
  '[Comment] Get Comment Succeed',
  props<{ comment: Comment[] }>()
);
export const getCommentFailed = createAction(
  '[Comment] Get Comment Failed',
  props<{ error: string }>()
);
