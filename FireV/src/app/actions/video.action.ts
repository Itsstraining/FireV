import { createAction, props } from "@ngrx/store";
import { Video } from "../models/video.model";

//add video to db
export const createVideo = createAction(
  '[Video] Create Video',
  props<{ idToken: string, video: Video }>()
)
export const createVideoSucceed = createAction(
  '[Video] Create Video Succeed',
  props<{ video: Video }>()
);
export const createVideoFailed = createAction(
  '[Video] Create Video Failed',
  props<{ error: string }>()
);

//get all video from db
export const getVideo = createAction(
  '[Video] Get Video',
);
export const getVideoSucceed = createAction(
  '[Video] Get Video Succeed',
  props<{ video: Video[] }>()
);
export const getVideoFailed = createAction(
  '[Video] Get Video Failed',
  props<{ error: string }>()
);

//get video by id from db
export const getVideoById = createAction(
  '[Video] Get Video By Id',
  props<{ id: string }>()
);
export const getVideoByIdSucceed = createAction(
  '[Video] Get Video By Id Succeed',
  props<{ video: Video }>()
);
export const getVideoByIdFailed = createAction(
  '[Video] Get Video By Id Failed',
  props<{ error: string }>()
);

//get all video except id from db
export const getAllExceptId = createAction(
  '[Video] Get All Except Id',
  props<{ id: string }>()
);
export const getAllExceptIdSucceed = createAction(
  '[Video] Get All Except Id Succeed',
  props<{ video: Video[] }>()
);
export const getAllExceptIdFailed = createAction(
  '[Video] Get All Except Id Failed',
  props<{ error: string }>()
);

//update views
export const updateViews = createAction(
  '[Video] Update Views',
  props<{ id: string, video: Video }>()
);
export const updateViewsSucceed = createAction(
  '[Video] Update Views Succeed',
  props<{ video: Video }>()
);
export const updateViewsFailed = createAction(
  '[Video] Update Views Failed',
  props<{ error: string }>()
);

//update likes
export const updateLikes = createAction(
  '[Video] Update Likes',
  props<{ id: string, idToken: string }>()
);
export const updateLikesSucceed = createAction(
  '[Video] Update Likes Succeed',
  props<{ video: Video }>()
);
export const updateLikesFailed = createAction(
  '[Video] Update Likes Failed',
  props<{ error: string }>()
);

//update dislikes
export const updateDislikes = createAction(
  '[Video] Update Dislikes',
  props<{ id: string, idToken: string }>()
);
export const updateDislikesSucceed = createAction(
  '[Video] Update Dislikes Succeed',
  props<{ video: Video }>()
);
export const updateDislikesFailed = createAction(
  '[Video] Update Dislikes Failed',
  props<{ error: string }>()
);

//update unlikes
export const updateUnlikes = createAction(
  '[Video] Update Unlikes',
  props<{ id: string, idToken: string }>()
);
export const updateUnlikesSucceed = createAction(
  '[Video] Update Unlikes Succeed',
  props<{ video: Video }>()
);
export const updateUnlikesFailed = createAction(
  '[Video] Update Unlikes Failed',
  props<{ error: string }>()
);

//update undislikes
export const updateUndislikes = createAction(
  '[Video] Update Undislikes',
  props<{ id: string, idToken: string }>()
);
export const updateUndislikesSucceed = createAction(
  '[Video] Update Undislikes Succeed',
  props<{ video: Video }>()
);
export const updateUndislikesFailed = createAction(
  '[Video] Update Undislikes Failed',
  props<{ error: string }>()
);



