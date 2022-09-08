import { createAction, props } from "@ngrx/store";

export const uploadVideos = createAction(
  '[UploadVideo] Upload Videos',
   props<{ files: File , idToken: string, video_id: string }>()
);
export const uploadVideoSucceed = createAction(
  '[UploadVideo] Upload Videos Succeed',
  props<{ filepath: string }>()
);
export const uploadVideoFailed = createAction(
  '[UploadVideo] Upload Video Failed',
  props<{ error: string }>()
);
