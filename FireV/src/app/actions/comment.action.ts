import { createAction, props } from "@ngrx/store";
import { Comment } from "../models/comment.model";

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ id: string, idToken: string, comment: Comment }>()
)
export const createCommentSucceed = createAction(
  '[Comment] Create Comment Succeed',
  props<{ comment: Comment }>()
);
export const createCommentFailed = createAction(
  '[Comment] Create Comment Failed',
  props<{ error: string }>()
);
