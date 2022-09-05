import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from 'src/app/actions/auth.action';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isShown: boolean = false; // hidden by default

  displayName: string | null = "";
  photoURL: string | null = "";

  token: string = "";
  idToken$ = this.store.select((state) => state.auth.idToken)

  constructor(private store: Store<{ auth: AuthState }>,
    private router: Router,
    private auth: Auth
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
}
