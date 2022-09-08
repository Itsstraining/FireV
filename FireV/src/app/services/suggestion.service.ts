import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suggestion } from '../models/suggestion.model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  constructor(private http: HttpClient) { }
  searching(keyword: string): Observable<Suggestion[]>{
    return this.http.get<Suggestion[]>('http://127.0.0.1:3000/suggestion/search?key='+`${keyword}`);
  }

}
