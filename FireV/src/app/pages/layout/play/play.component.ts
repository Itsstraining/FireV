import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from 'src/app/actions/video.action';
import * as AuthActions from 'src/app/actions/auth.action';
import { AuthState } from 'src/app/states/auth.state';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';

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
  //getSub$ = this.store.select((state) => state.auth.user);
  idToken$ = this.store.select((state) => state.auth.idToken);
  idToken: string = '';
  userId$ = this.store.select((state) => state.auth._id);
  userId: any;
  author: User = <User>{};
  subUser: User = <User>{};
  like: number = 0;
  dislike: number = 0;
  subscriber: number = 0;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  isSubscribed: boolean = false;
  subscriberList: Array<string> = [];
  likeList: Array<string> = [];
  dislikeList: Array<string> = [];
  idOfAuthor: string = '';
  constructor(
    public route: ActivatedRoute,
    private store: Store<{ video: VideoState; auth: AuthState }>,
    private snackBar: MatSnackBar
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

    // this.getSub$.subscribe((value) => {
    //   if(value.subscribers != undefined && value.subscriberList != undefined){
    //     this.subscriber = value.subscribers;
    //     this.subscriberList = value.subscriberList;
    //     console.log('sublist nè ' + this.subscriberList);
    //     console.log('sub nè ' + this.subscriber);
    //   }

    // });

    this.playVideo$.subscribe((value) => {
      if (value != null && value != undefined) {
        this.author = value.author;
        this.idOfAuthor = value.author._id;
        console.log(value);
        console.log('Author id nè ' + this.author._id);
      }
      if (value.like != undefined && value.dislike != undefined) {
        this.like = value.like;
        this.dislike = value.dislike;
        this.subscriber = value.author.subscribers;
        this.subscriberList = value.author.subscriberList;
        console.log('Like nè ' + this.like);
        console.log('Dislike nè ' + this.dislike);
        console.log('sublist nè ' + this.subscriberList);
        console.log('sub nè ' + this.subscriber);
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
          if (this.subscriberList.includes(this.userId)) {
            console.log('sublist nè ' + this.subscriberList);
            this.isSubscribed = true;
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
        }

        // console.log(this.totalTime);
        // console.log((this.totalTime * 60)/100.0);

        // console.log(this.currentTime);
      });
    });
  }

  updateLike(videoId: string) {
    if(this.userId == ''){
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000
      });
    }
   else{
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
    } else if (this.isDisliked == false && this.isLiked == true) {
      this.store.dispatch(VideoActions.updateUnlikes({ id: videoId, idToken: this.idToken }));
      this.like -= 1;
      this.isLiked = false;
    }
   }
  }
  updateDislike(videoId: string) {
    if(this.userId == ''){
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000
      });
    }else{
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

  updateSubcribe(authorId: string) {
    if(this.author._id != this.userId){
      if(this.userId == ''){
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000
        });
      }else{
        this.store.dispatch(AuthActions.updateSub({ id: authorId, idToken: this.idToken }));
        if (this.isSubscribed == false) {
          this.subscriber += 1;
          this.isSubscribed = true;
        } else if (this.isSubscribed == true) {
          this.subscriber -= 1;
          this.isSubscribed = false;
        }
      }
    }

  }


}
