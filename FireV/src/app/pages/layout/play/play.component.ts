import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from 'src/app/actions/video.action';
import * as AuthActions from 'src/app/actions/auth.action';
import { AuthState } from 'src/app/states/auth.state';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {
  videoDuration: any;
  currentTime: number = 0;
  totalTime: number = 0;

  playVideo$ = this.store.select((state) => state.video.videoLoad);
  getAllExceptId$ = this.store.select((state) => state.video.videoList);

  idToken$ = this.store.select((state) => state.auth.idToken);
  idToken: string = '';
  userId$ = this.store.select((state) => state.auth._id);
  userId: any;
  author: User = <User>{};
  like: number = 0;
  dislike: number = 0;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  likeList: Array<string> = [];
  dislikeList: Array<string> = [];

  constructor(
    public route: ActivatedRoute,
    private store: Store<{ video: VideoState; auth: AuthState }>
  ) {
    //const currentTime: Observable<number> = 0;
    //const totalTime: Observable<number> = 0;
    const id: Observable<string> = route.queryParams.pipe(map((p) => p['id']));
    id.subscribe((id) => {
      this.store.dispatch(VideoActions.getVideoById({ id: id }));
      this.store.dispatch(VideoActions.getAllExceptId({ id: id }));
    });

    //get idtoken from user
    this.idToken$.subscribe((value) => {
      if (value) {
        this.idToken = value;
        this.store.dispatch(AuthActions.getUserId({ idToken: this.idToken }));
      } else {
        this.idToken = '';
        this.userId = '';
      }
    });


    this.playVideo$.subscribe((value) => {
      if (value != null && value != undefined) {
        this.author = value.author;
        console.log(value);
        console.log('Author id nè ' + this.author._id);
      }
      if (value.like != undefined && value.dislike != undefined) {
        this.like = value.like;
        this.dislike = value.dislike;
        console.log('Like nè ' + this.like);
        console.log('Dislike nè ' + this.dislike);
        this.likeList = value.likeList;
        this.dislikeList = value.dislikeList;
      }
    });

  }

  ngOnInit(): void {
    this.userId$.subscribe((value) => {
      if (value) {
        this.userId = value;
        console.log('User id nè ' + this.userId);
        if (this.likeList.includes(this.userId)) {
          this.isLiked = true;
        } else if (this.dislikeList.includes(this.userId)) {
          this.isDisliked = true;
        }
      }
    });



  }

  playVideo(id: string) {
    // this.router.navigateByUrl(`/play?id=${id}`);
    window.location.href = `/play?id=${id}`;
  }

  setCurrentTime(event: any) {
    this.currentTime = event.target.currentTime.toFixed(3);
    this.totalTime = event.target.duration;
    //  console.log(this.currentTime);
    const id: Observable<string> = this.route.queryParams.pipe(
      map((p) => p['id'])
    );
    id.subscribe((id) => {
      const video: Observable<any> = this.route.queryParams.pipe(
        map((p) => p['video'])
      );
      video.subscribe((video) => {
        if (this.author._id != this.userId) {

          if (this.currentTime > ((this.totalTime * 60) / 100.0) && this.currentTime < (((this.totalTime * 60) / 100.0) + 0.2)) {
            this.store.dispatch(
              VideoActions.updateViews({ id: id, video: video })
            );
          }
          // if (this.totalTime >= 120.0) {
          //   if (this.currentTime > 120.0 && this.currentTime < 120.2) {
          //     this.store.dispatch(
          //       VideoActions.updateViews({ id: id, video: video })
          //     );
          //   }
          // } else if (this.totalTime < 120.0) {
          //   if (this.currentTime >= this.totalTime) {
          //     this.store.dispatch(
          //       VideoActions.updateViews({ id: id, video: video })
          //     );
          //   }
          // }
        }

        // console.log(this.totalTime);
        // console.log((this.totalTime * 60)/100.0);

        // console.log(this.currentTime);
      });
    });
  }

  updateLike(videoId: string) {
    if (this.isDisliked == false && this.isLiked == false) {
      this.store.dispatch(VideoActions.updateLikes({ id: videoId, idToken: this.idToken }));
      this.like += 1;
      this.isLiked = true;
    }
    else if (this.isDisliked == true && this.isLiked == false) {
      this.store.dispatch(VideoActions.updateLikes({ id: videoId, idToken: this.idToken }));
      this.dislike -= 1;
      this.like += 1;
      this.isLiked = true;
      this.isDisliked = false;
    } else if (this.isDisliked == true && this.isLiked == false) {
      this.store.dispatch(VideoActions.updateUnlikes({ id: videoId, idToken: this.idToken }));
      this.like -= 1;
      this.isLiked = false;
    }
  }
  updateDislike(videoId: string) {
    if (this.isDisliked == false && this.isLiked == false) {
      this.store.dispatch(VideoActions.updateDislikes({ id: videoId, idToken: this.idToken }));
      this.dislike += 1;
      this.isDisliked = true;
    }
    else if (this.isDisliked == false && this.isLiked == true) {
      this.store.dispatch(VideoActions.updateDislikes({ id: videoId, idToken: this.idToken }));
      this.dislike += 1;
      this.like -= 1;
      this.isLiked = false;
      this.isDisliked = true;
    } else if (this.isDisliked == true && this.isLiked == false) {
      this.store.dispatch(VideoActions.updateUndislikes({ id: videoId, idToken: this.idToken }));
      this.dislike -= 1;
      this.isDisliked = false;
    }
  }


}
