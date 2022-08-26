import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from 'src/app/actions/auth.action';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isShown: boolean = false; // hidden by default
  displayName : string | null = "";
  photoURL : string | null = "";
  constructor(private store: Store <{ auth: AuthState }>,
    ) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        // ...
      } else {
        this.displayName = "";
        this.photoURL = "";
      }

    });
  }

  ngOnInit(): void {}
  
  login() {
    this.store.dispatch(AuthActions.login());
  }

  logout() {
    this.store.dispatch(AuthActions.logOut());
    this.isShown = !this.isShown;
  }

  toggleShow() {
    this.isShown = !this.isShown;
  }
  handleError(e: any) {
    console.log(e);
    e.target.src = "../../../../../../../assets/images/user_crack.png";
  }

}
