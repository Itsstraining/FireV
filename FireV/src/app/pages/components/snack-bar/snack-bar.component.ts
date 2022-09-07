import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from 'src/app/actions/auth.action';
@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor( private store: Store<{ auth: AuthState }>) { }

  ngOnInit(): void {
  }

  login(){
    this.store.dispatch(AuthActions.login());
  }

}
