import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { CommentService} from "../services/comment.service";
import * as CommentActions from "../actions/comment.action";
import { Comment } from "../models/comment.model";
@Injectable()
export class CommentEffect {
  constructor(
    private actions$: Actions,
    private commentService: CommentService,
  ) { }

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.createComment),
      switchMap((action) => {
        return this.commentService.createComment(action.id, action.comment, action.idToken);
      }),
     map((comment) => CommentActions.createCommentSucceed({ comment })),
      catchError((error) => {
        return of(CommentActions.createCommentFailed({ error: error }));
      }
    )
  ));

  getComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.getComment),
      switchMap((action) => {
        return this.commentService.getComment(action.id);
      }),
     map((comment) => {
      comment.forEach(async comment => {
        let total = new Date().getTime() - new Date(comment.createdAt).getTime();
        comment.hours = Math.round((Math.floor((total) / 1000)) / 3600);
          comment.minutes = Math.round((Math.floor((total) / 1000)) / 60);
          comment.seconds = Math.round((Math.floor((total) / 1000)));
          comment.days = Math.round((Math.floor((total) / 1000)) / 86400);
          if (comment.hours > 0 && comment.hours < 24) {
            comment.timeUp = comment.hours.toString() + " giờ";
          }
          else if (comment.minutes > 0 && comment.minutes < 60 && comment.hours == 0) {
            comment.timeUp = comment.minutes.toString() + " phút";
          }
          else if (comment.seconds > 0 && comment.seconds < 60 && comment.minutes == 0 && comment.hours == 0) {
            comment.timeUp = comment.seconds.toString + " giây";
          }
          else if (comment.hours >= 24) {
            comment.timeUp = comment.days.toString() + " ngày";
          }
        });
      return CommentActions.getCommentSucceed({ comment });}
     ),
      catchError((error) => {
        return of(CommentActions.getCommentFailed({ error: error }));
      }
    )
  ));

  updateLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.updateLike),
      switchMap((action) => {
        return this.commentService.updateLike(action.id, action.idToken);
      }),
     map((comment) => CommentActions.updateLikeSucceed({ comment })),
      catchError((error) => {
        return of(CommentActions.updateLikeFailed({ error: error }));
      }
    )
  ));

  updateDislike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.updateDislike),
      switchMap((action) => {
        return this.commentService.updateDislike(action.id, action.idToken);
      }),
     map((comment) => CommentActions.updateDislikeSucceed({ comment })),
      catchError((error) => {
        return of(CommentActions.updateDislikeFailed({ error: error }));
      }
    )
  ));

  updateUnlike$  = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.updateUnlike),
      switchMap((action) => {
        return this.commentService.updateUnlike(action.id, action.idToken);
      }),
     map((comment) => CommentActions.updateUnlikeSucceed({ comment })),
      catchError((error) => {
        return of(CommentActions.updateUnlikeFailed({ error: error }));
      }
    )
  ));

  updateUndislike$  = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.updateUndislike),
      switchMap((action) => {
        return this.commentService.updateUndislike(action.id, action.idToken);
      }),
     map((comment) => CommentActions.updateUndislikeSucceed({ comment })),
      catchError((error) => {
        return of(CommentActions.updateUndislikeFailed({ error: error }));
      }
    )
  ));
}
