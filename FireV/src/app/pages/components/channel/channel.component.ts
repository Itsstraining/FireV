import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from 'src/app/actions/video.action';
import * as AuthActions from 'src/app/actions/auth.action';
import { AuthState } from 'src/app/states/auth.state';
import { User } from 'src/app/models/user.model';
import { FormControl, FormGroup } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { UpdateComponent } from 'src/app/pages/components/update/update.component';
import {MatDialog} from '@angular/material/dialog';
import { InteractService } from 'src/app/services/interact.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(0%)' }),
        animate(.3, style({ transform: 'translateX(.5s)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(.3, 
        style({ transform: 'translateX(.5s)' }))
      ])
    ])
  ]
})
export class ChannelComponent implements OnInit {
  videoDuration: any;
  currentTime: number = 0;
  totalTime: number = 0;
  isMinimize: boolean = false;
  playVideo$ = this.store.select((state) => state.video.videoLoad);
  getAllExceptId$ = this.store.select((state) => state.video.videoList);

  idToken$ = this.store.select((state) => state.auth.idToken);
  idToken: string = '';
  userId$ = this.store.select((state) => state.auth._id);
  userId: string = '';
  author: User = <User>{};
  form!: FormGroup;
  constructor(public dialog: MatDialog, public route: ActivatedRoute,
    public interactService : InteractService, 
    private store: Store<{ video: VideoState; auth: AuthState }>) {
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
      if (value) {
        this.author = value.author;
        console.log(value);
        console.log('Author id nè ' + this.author._id);
      }
    }); 
  }

  ngOnInit(): void {
    this.userId$.subscribe((value) => {
      if (value) {
        this.userId = value;
        console.log('User id nè ' + this.userId);
      }
    });
    this.interactService.listenToggleMenu((isCheck) => {
      this.isMinimize = isCheck
      console.log(this.isMinimize)
      // this.changeDetector.detectChanges()
    });
  }
  // openDialog1() {
  //   const dialogRef = this.dialog.open(UpdateComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
    //this.dialog.open(UpdateComponent);

  openDialogUpdate() {
    const dialogRef = this.dialog.open(UpdateComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // openAddPage(){
  //   this.router.navigateByUrl('add');
  // }

  playVideo(id: string) {
    // this.router.navigateByUrl(`/play?id=${id}`);
    window.location.href = `/play?id=${id}`;
  }

  setCurrentTime(event: any) {
    this.currentTime = event.target.currentTime;
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
          if (this.totalTime >= 120.0) {
            if (this.currentTime > 120.0 && this.currentTime < 120.2) {
              this.store.dispatch(
                VideoActions.updateViews({ id: id, video: video })
              );
            }
          } else if (this.totalTime < 120.0) {
            if (this.currentTime >= this.totalTime) {
              this.store.dispatch(
                VideoActions.updateViews({ id: id, video: video })
              );
            }
          }
        }

        console.log(this.totalTime);
        // console.log(this.currentTime);
      });
    });
  }
}


