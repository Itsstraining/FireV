import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoState } from 'src/app/states/video.state';
import { Video } from 'src/app/models/video.model';
import * as VideoActions from 'src/app/actions/video.action';
import { Router } from '@angular/router';
import { InteractService } from 'src/app/services/interact.service';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slidein', [
      transition(':enter', [
        // when ngif has true
        style({ transform: 'translateX(0%)' }),
        animate(.3, style({ transform: 'translateX(.2s)' }))
      ]),
      transition(':leave', [
        // when ngIf has false
        animate(.3, 
        style({ transform: 'translateX(.2s)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  Video$ = this.store.select((state) => state.video.videoList);
  isMinimize: boolean = false;
  
  constructor(
    private store: Store<{ video: VideoState }>,
    private router: Router,
    public interactService : InteractService,

  ) {}

  ngOnInit(): void {
    this.store.dispatch(VideoActions.getVideo());
    this.interactService.listenToggleMenu((isCheck) => {
      this.isMinimize = isCheck
      console.log(this.isMinimize)
      // this.changeDetector.detectChanges()
    });
  }

  handleError(e: any) {
    console.log(e);
    e.target.src = '../../../../../../../assets/images/user.png';
  }

  playVideo(id: string) {
    // this.router.navigateByUrl(`/play?id=${id}`);
    window.location.href = `/play?id=${id}`;
  }

  test() {
    console.log('binh');
  }

  goToPopularPage(){
    this.router.navigateByUrl('popular');
  }
}
