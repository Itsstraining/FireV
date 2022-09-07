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
}
