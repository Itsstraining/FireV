import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as SuggestionAcitons from "../actions/suggestion.action";
import { catchError, of, switchMap, map } from "rxjs";
import { SuggestionService } from "../services/suggestion.service";

@Injectable()
export class SuggestionEffects {

    constructor(private action$: Actions, private suggestionService: SuggestionService) {
    }
    searchingEffect = createEffect(() => this.action$.pipe(
        ofType(SuggestionAcitons.searching),
        switchMap((action) => this.suggestionService.searching(action.keyword)),
        map(searchResult => {      
            return SuggestionAcitons.searchingSuccess({ searchResult: searchResult })
        }),
        catchError(error => of(SuggestionAcitons.searchingFailure({ error }))),
    ))
}