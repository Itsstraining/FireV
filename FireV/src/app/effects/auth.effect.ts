import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import * as AuthActions from '../actions/auth.action';
import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { UserService } from "../services/user.service";
@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: AuthService, private userService: UserService) { }
  authEffect$ = createEffect(() => this.action$.pipe(
    ofType(AuthActions.login),
    switchMap(() => this.authService.login()),
    map(idToken => AuthActions.loginSuccess({ idToken: idToken })),
    catchError(error => of(AuthActions.loginFailure({ error: error })))));


  logOutEffect$ = createEffect(() => this.action$.pipe(
    ofType(AuthActions.logOut),
    switchMap(() => this.authService.logOut()),
    map(() => AuthActions.logOutSuccess()),
    catchError(error => of(AuthActions.logOutFailure({ error: error })))));

  getIdTokenEffect = createEffect(() => this.action$.pipe(
    ofType(AuthActions.getIdToken),
    switchMap(() => this.authService.getIdToken()),
    map((idToken) => AuthActions.getIdTokenSuccess({ idToken })),
    catchError(error => of(AuthActions.getIdTokenFailure({ error: error }))),
  ))

  getUserIdEffect = createEffect(() => this.action$.pipe(
    ofType(AuthActions.getUserId),
    switchMap((state) => this.userService.getUserId(state.idToken)),
    map((_id) => AuthActions.getUserIdSuccess({ _id })),
    catchError(error => of(AuthActions.getUserIdFailure({ error: error }))),
  ))

  createUserEffect = createEffect(() => this.action$.pipe(
    ofType(AuthActions.createUser),
    switchMap((state) => this.userService.createUser(state.idToken)),
    map((user) => {
      if(!user){
        return  AuthActions.createUserSuccess({ user : 'User is already exsited' })
      }else{
        return  AuthActions.createUserSuccess({ user })
      }
    }),
    catchError(error => of(AuthActions.createUserFailure({ error: error }))),
  ))

  updateSubEffect = createEffect(() => this.action$.pipe(
    ofType(AuthActions.updateSub),
    switchMap((action) => this.userService.updateSubcribers(action.id, action.idToken)),
    map((user) => AuthActions.updateSubSuccess({ user })),
    catchError(error => of(AuthActions.updateSubFailure({ error: error }))),
  ))

}
