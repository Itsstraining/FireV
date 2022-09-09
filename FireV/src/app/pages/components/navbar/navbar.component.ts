import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from 'src/app/actions/auth.action';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as SuggestionActions from '../../../actions/suggestion.action';
import { SuggestionState } from 'src/app/states/suggestion.state';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  resultShow !: boolean;
  isShown: boolean = false; // hidden by default

  displayName: string | null = "";
  photoURL: string | null = "";

  token: string = "";
  idToken$ = this.store.select((state) => state.auth.idToken)
  searchResult$ = this.store.select((state) => state.suggest);

  constructor(private store: Store<{ auth: AuthState, suggest : SuggestionState }>,
    private router: Router,
    private auth: Auth,
  ) {
  }

  ngOnInit(): void { 
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.idToken$.subscribe((value) => {
          if (value) {
            this.token = value;
            this.store.dispatch(AuthActions.createUser({ idToken: this.token }))
          }
        })
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
      } else {
        this.displayName = "";
        this.photoURL = "";
      }
    });
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logOut());
    this.isShown = !this.isShown;
    this.router.navigateByUrl('./');
  }
  toggleShow() {
    this.isShown = !this.isShown;
  }
  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }
  home() {
    this.router.navigateByUrl('./');
  }
  goToAdd(){
    this.router.navigateByUrl('add');
  }
  goToChannel(){
    this.router.navigateByUrl('channel');
  }

  
  filterTextChanged: Subject<string> = new Subject<string>();
  // debounce filter text changes
  onFilterTextChanged(e: any) {
    if(e.target.value == ""){
      this.resultShow = false;
    }else{
      this.resultShow = true;
    }
    if (this.filterTextChanged.observers.length === 0) {
      this.filterTextChanged
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(filterQuery => {
          this.loadData(filterQuery);
        });
    }
    this.filterTextChanged.next(e.target.value);
  }

  loadData(filterQuery: string) {
    if (filterQuery) {
      this.store.dispatch(SuggestionActions.searching({keyword:filterQuery}))
    }
  }
  playVideo(videoId:string){
    
    window.location.href = `/play?id=${videoId}`
  }
}
