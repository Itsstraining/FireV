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

//update like
export const updateLike = createAction(
  '[Comment] Update Like Of Comment',
  props<{ id: string, idToken: string }>()
);
export const updateLikeSucceed = createAction(
  '[Comment] Update Like Of Comment Succeed',
  props<{ comment: Comment }>()
);
export const updateLikeFailed = createAction(
  '[Comment] Update Like Of Comment Failed',
  props<{ error: string }>()
);

//update dislike
export const updateDislike = createAction(
  '[Comment] Update Dislike Of Comment',
  props<{ id: string, idToken: string }>()
);
export const updateDislikeSucceed = createAction(
  '[Comment] Update Dislike Of Comment Succeed',
  props<{ comment: Comment }>()
);
export const updateDislikeFailed = createAction(
  '[Comment] Update Dislike Of Comment Failed',
  props<{ error: string }>()
);

//update unlike
export const updateUnlike = createAction(
  '[Comment] Update Unlike Of Comment',
  props<{ id: string, idToken: string }>()
);
export const updateUnlikeSucceed = createAction(
  '[Comment] Update Unlike Of Comment Succeed',
  props<{ comment: Comment }>()
);
export const updateUnlikeFailed = createAction(
  '[Comment] Update Unlike Of Comment Failed',
  props<{ error: string }>()
);

//update undislike
export const updateUndislike = createAction(
  '[Comment] Update Undislike Of Comment',
  props<{ id: string, idToken: string }>()
);
export const updateUndislikeSucceed = createAction(
  '[Comment] Update Undislike Of Comment Succeed',
  props<{ comment: Comment }>()
);
export const updateUndislikeFailed = createAction(
  '[Comment] Update Undislike Of Comment Failed',
  props<{ error: string }>()
);
