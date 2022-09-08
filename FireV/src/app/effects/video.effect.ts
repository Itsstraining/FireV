import { createVideoSucceed, getVideoById } from './../actions/video.action';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddVideoService } from '../services/add-video.service';
import * as VideoActions from '../actions/video.action';
import { from, switchMap, of, map, catchError } from 'rxjs';
@Injectable()
export class VideoEffect {
  constructor(
    private actions$: Actions,
    private addVideoService: AddVideoService,

  ) { }

  uploadVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.createVideo),
      switchMap((action) => {
        return this.addVideoService.createVideo(action.video, action.idToken);
      }),
      map((video) => VideoActions.createVideoSucceed({ video })),
      catchError((error) =>
        of(VideoActions.createVideoFailed({ error: error }))
      )
    )
  );
  getVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.getVideo),
      switchMap(() => {
        return this.addVideoService.getVideo();
      }),
      map((video) => {
        video.forEach(async video => {
          let total = new Date().getTime() - new Date(video.createdAt).getTime();
          // let timeUp: number = 0;
          video.hour = Math.round((Math.floor((total) / 1000)) / 3600);
          video.minute = Math.round((Math.floor((total) / 1000)) / 60);
          video.second = Math.round((Math.floor((total) / 1000)));
          video.day = Math.round((Math.floor((total) / 1000)) / 86400);
          if (video.hour > 0 && video.hour < 24) {
            video.timeUp = video.hour.toString() + " giờ";
          }
          else if (video.minute > 0 && video.minute < 60 && video.hour == 0) {
            video.timeUp = video.minute.toString() + " phút";
          }
          else if (video.second > 0 && video.second < 60 && video.minute == 0 && video.hour == 0) {
            video.timeUp = video.second.toString + " giây";
          }
          else if (video.hour >= 24) {
            video.timeUp = video.day.toString() + " ngày";
          }
        });
        return VideoActions.getVideoSucceed({ video });
      }),
      catchError((error) => of(VideoActions.getVideoFailed({ error: error })))
    )
  );

  getVideoById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.getVideoById),
      switchMap((action) => {
        return this.addVideoService.getVideoByIdDb(action.id);
      }),
      map((video) => {
        let total = new Date().getTime() - new Date(video.createdAt).getTime();
            let hourConvert  = Math.round((Math.floor((total) / 1000)) / 3600);
            if (hourConvert > 24) {
                if (hourConvert < 48) {
                    video.timeUp = Math.round(hourConvert / 24).toString() + " ngày trước";
                } else {
                    video.timeUp = Math.round(hourConvert / 24).toString() + " ngày trước";
                }
            }
            else if(hourConvert >= 1 ){
                if (hourConvert == 1) {
                    video.timeUp = hourConvert.toString() + " tiếng trước";
                }
                else {
                    video.timeUp = hourConvert.toString() + " tiếng trước";
                }
            }
            else if (hourConvert < 1) {
                let minuteConvert = Math.round((Math.floor((total) / 1000)) / 3600 * 60);
                if (minuteConvert < 1) {
                    video.timeUp = Math.round((Math.floor((total) / 1000))).toString() + " giây trước";
                } else {
                    if (minuteConvert == 1) {
                        video.timeUp = minuteConvert.toString() + " phút trước";
                    }
                    else {
                        video.timeUp = minuteConvert.toString() + " phút trước";
                    }
                }
            }
        return VideoActions.getVideoByIdSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.getVideoByIdFailed({ error: error }))
      )
    )
  );

  getAllVideoExceptId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.getAllExceptId),
      switchMap((action) => {
        return this.addVideoService.getAllExceptId(action.id);
      }),
      map((video) => {
        return VideoActions.getAllExceptIdSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.getAllExceptIdFailed({ error: error }))
      )
    )
  );
  updateViews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.updateViews),
      switchMap((action) => {
        return this.addVideoService.updateViews(action.id);
      }),
      map((video) => {
        return VideoActions.updateViewsSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.updateViewsFailed({ error: error }))
      )
    )
  );
  updateLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.updateLikes),
      switchMap((action) => {
        return this.addVideoService.updateLikes(action.id, action.idToken);
      }),
      map((video) => {
        return VideoActions.updateLikesSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.updateLikesFailed({ error: error }))
      )
    )
  );
  updateDislike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.updateDislikes),
      switchMap((action) => {
        return this.addVideoService.updateDislikes(action.id, action.idToken);
      }),
      map((video) => {
        return VideoActions.updateDislikesSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.updateDislikesFailed({ error: error }))
      )
    )
  );
  updateUndislike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.updateUndislikes),
      switchMap((action) => {
        return this.addVideoService.updateUndislikes(action.id, action.idToken);
      }),
      map((video) => {
        return VideoActions.updateUndislikesSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.updateUndislikesFailed({ error: error }))
      )
    )
  );
  updateUnlike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.updateUnlikes),
      switchMap((action) => {
        return this.addVideoService.updateUnlikes(action.id, action.idToken);
      }),
      map((video) => {
        return VideoActions.updateUnlikesSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.updateUnlikesFailed({ error: error }))
      )
    )
  );

  getVideoByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.getVideoByUserId),
      switchMap((action) => {
        return this.addVideoService.getVideoByUserId(action.id, action.idToken);
      }),
      map((video) => {
         video.forEach(async video => {
          let total =  new Date(video.createdAt).toLocaleDateString();
          video.createdAt = total;
          console.log(video.createdAt);
        })
        return VideoActions.getVideoByUserIdSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.getVideoByUserIdFailed({ error: error }))
    )
  ));

  deleteVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoActions.deleteVideo),
      switchMap((action) => {
        return this.addVideoService.deleteVideo(action.id, action.idToken);
      }),
      map((video) => {
        return VideoActions.deleteVideoSucceed({ video });
      }),
      catchError((error) =>
        of(VideoActions.deleteVideoFailed({ error: error }))
      )
    )
  );


}
