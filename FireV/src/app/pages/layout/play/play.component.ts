import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from 'src/app/actions/video.action';
import * as AuthActions from 'src/app/actions/auth.action';
import { AuthState } from 'src/app/states/auth.state';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../components/snack-bar/snack-bar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CommentActions from 'src/app/actions/comment.action';
import { CommentState } from 'src/app/states/comment.state';
import { HlsService } from 'src/app/services/hls.service';
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
})
export class PlayComponent implements OnInit {

  //hls source testing
  source: string = "";


  playVideo$ = this.store.select((state) => state.video.videoLoad);
  getAllExceptId$ = this.store.select((state) => state.video.videoList);
  //getSub$ = this.store.select((state) => state.auth.user);
  idToken$ = this.store.select((state) => state.auth.idToken);
  idToken: string = '';
  userId$ = this.store.select((state) => state.auth._id);
  userId: any;
  userAvatar$ = this.store.select((state) => state.auth.user);
  userAvatar: any;
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
  photoURL: string | null = "";
  form!: FormGroup;
  btnSubmit: boolean = false;


  isLikedComment: boolean = false;
  isDislikedComment: boolean = false;
  getCommentByVideoId$ = this.store.select((state) => state.comment.commentList);
  authorComment: User = <User>{};
  likeCom: number = 0;
  dislikeCom: number = 0;
  commentTam: User = <User>{};


  constructor(
    public hlsService: HlsService,
    public router: Router,
    public route: ActivatedRoute,
    private store: Store<{ video: VideoState; auth: AuthState, comment: CommentState }>,
    private snackBar: MatSnackBar,
    private auth: Auth,
    private formBuilder: FormBuilder,
  ) {
    //const currentTime: Observable<number> = 0;
    //const totalTime: Observable<number> = 0;
    const id: Observable<string> = route.queryParams.pipe(map((p) => p['id']));
    id.subscribe((id) => {
      this.store.dispatch(VideoActions.getVideoById({ id: id }));
      this.store.dispatch(VideoActions.getAllExceptId({ id: id }));
      this.store.dispatch(CommentActions.getComment({ id: id }));
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
        this.idOfAuthor = value.author._id;
        console.log(value);
        console.log('Author id nè ' + this.author._id);
      }
      if (value.like != undefined && value.dislike != undefined) {
        this.source = `http://127.0.0.1:3000/${value.url}-conv/main.m3u8`
        // this.source = `http://127.0.0.1:5000/1662479356341-523049444.mp4-conv/main.m3u8`
        let audioControl = document.getElementById('video');
        this.hlsService.hls.loadSource(this.source)
        if (audioControl != null) {
          this.hlsService.hls.attachMedia(audioControl as HTMLMediaElement)
        }
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

    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.photoURL = user.photoURL;
      }
    });

    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });

  }

  playVideo(id: string) {
    this.router.navigateByUrl(`/play?id=${id}`);
    // window.location.href = `/play?id=${id}`;
  }

  //count time to plus 1 view///////////////////////////////////////////////////////////////////////
  timeOutId: NodeJS.Timeout | undefined = undefined;
  isCount: boolean = false;
  totalTime: number = 0;
  timePlay: number = 0;
  duration: number = 0;

  predictTimeToCount(event: any, videoId: string) {
    this.duration = Math.floor(event.target.duration);
    this.timePlay = Date.now();
    console.log(`time has played: ${this.totalTime / 1000} s`);
    if (this.totalTime == 0) {
      this.timeOutId = setTimeout(() => {
        if (this.isCount == false) {
          this.playVideo$.subscribe((video) => {
            if (video.author._id != this.userId) {
              this.isCount = !this.isCount;
              console.log("+1");
              this.store.dispatch(VideoActions.updateViews({ id: videoId, video }));

            }
          })
        }
      }, (this.duration * 0.6) * 1000)
    }
    if (this.totalTime > 0) {
      this.timeOutId = setTimeout(() => {
        if (this.isCount == false) {
          this.playVideo$.subscribe((video) => {
            if (video.author._id != this.userId) {
              this.isCount = !this.isCount;
              console.log("+1");
              this.store.dispatch(VideoActions.updateViews({ id: videoId, video }));
            }
          })
        }
      }, this.duration * 0.6 * 1000 - this.totalTime)
    }
  }
  resetCountable() {
    if (this.isCount == true) {
      clearTimeout(this.timeOutId);
      this.isCount = !this.isCount;
      this.totalTime = 0;
    } else {
      clearTimeout(this.timeOutId);
      this.totalTime = 0;
    }
  }
  stopCountingTime() {
    clearTimeout(this.timeOutId);
    this.totalTime += Date.now() - this.timePlay;
  }





  updateLike(videoId: string) {
    if (this.userId == '') {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000
      });
    }
    else {
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
    if (this.userId == '') {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000
      });
    } else {
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
    if (this.author._id != this.userId) {
      if (this.userId == '') {
        this.snackBar.openFromComponent(SnackBarComponent, {
          duration: 3000
        });
      } else {
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
  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }

  handleAuthorError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/anime.png";
  }

  createComment(idVideo: string) {
    if (this.userId == '') {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 3000
      });
    } else {
      let newForm = {
        ...this.form.value,
      };
      this.store.dispatch(CommentActions.createComment({ id: idVideo, idToken: this.idToken, comment: newForm }));
      this.form.reset();
    }

  }

  openSubmit(event: any) {

    if (event.target.style.borderBottom == '1px solid black') {
      console.log('open');
      event.target.style.borderBottom = '1px solid #ccc';
    } else {
      console.log('open1');
      event.target.style.borderBottom = '1px solid black';
    }
    this.btnSubmit = true;
  }

  closeSubmit() {
    this.btnSubmit = false;
  }



  // updateLikeComment(commentId: string) {
  //   if(this.userId == ''){
  //     this.snackBar.openFromComponent(SnackBarComponent, {
  //       duration: 3000
  //     });
  //   }
  //  else{
  //   if (this.isDislikedComment == false && this.isLikedComment == false) {
  //     this.store.dispatch(CommentActions.updateLike({ id: commentId, idToken: this.idToken }));
  //     this.like += 1;
  //     this.isLiked = true;
  //   }
  //   else if (this.isDisliked == true && this.isLiked == false) {
  //     this.store.dispatch(VideoActions.updateLikes({ id: videoId, idToken: this.idToken }));
  //     this.dislike -= 1;
  //     this.like += 1;
  //     this.isLiked = true;
  //     this.isDisliked = false;
  //   } else if (this.isDisliked == false && this.isLiked == true) {
  //     this.store.dispatch(VideoActions.updateUnlikes({ id: videoId, idToken: this.idToken }));
  //     this.like -= 1;
  //     this.isLiked = false;
  //   }
  //  }
  // }
  // updateDislikeComment(videoId: string) {
  //   if(this.userId == ''){
  //     this.snackBar.openFromComponent(SnackBarComponent, {
  //       duration: 3000
  //     });
  //   }else{
  //     if (this.isDisliked == false && this.isLiked == false) {
  //       this.store.dispatch(VideoActions.updateDislikes({ id: videoId, idToken: this.idToken }));
  //       this.dislike += 1;
  //       this.isDisliked = true;
  //     }
  //     else if (this.isDisliked == false && this.isLiked == true) {
  //       this.store.dispatch(VideoActions.updateDislikes({ id: videoId, idToken: this.idToken }));
  //       this.dislike += 1;
  //       this.like -= 1;
  //       this.isLiked = false;
  //       this.isDisliked = true;
  //     } else if (this.isDisliked == true && this.isLiked == false) {
  //       this.store.dispatch(VideoActions.updateUndislikes({ id: videoId, idToken: this.idToken }));
  //       this.dislike -= 1;
  //       this.isDisliked = false;
  //     }
  //   }

  // }

}
