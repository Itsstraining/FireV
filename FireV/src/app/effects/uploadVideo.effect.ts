import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { VideoUploadService } from '../services/video-upload.service';
import { createEffect, ofType } from '@ngrx/effects';
import * as UploadVideoActions from '../actions/uploadVideo.action';
import { from, switchMap, of, map, catchError } from 'rxjs';
@Injectable()
export class UploadVideoEffect {
  constructor(
    private actions$: Actions,
    private videoUploadService: VideoUploadService
  ) {}

  uploadVideo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UploadVideoActions.uploadVideos),
      switchMap((action) => {
        let formData = new FormData();
        formData.append('video', action.files);
        return this.videoUploadService.addVideo(formData);
      }),
      map((filepath: any) => {
        console.log('Test ' + filepath['path']);
        return UploadVideoActions.uploadVideoSucceed({
          filepath: filepath['path'].toString(),
        });
      }),
      catchError((error) => {
        console.log(error);
        return of(UploadVideoActions.uploadVideoFailed({ error: error }));
      })
    )
  );
}
