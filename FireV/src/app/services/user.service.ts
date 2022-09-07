import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(idToken: string) {
    return this.http.post('http://127.0.0.1:3000/user/send', '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  public getUserId(idToken:string){
    return this.http.get<string>('http://127.0.0.1:3000/user/id', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  updateSubcribers(id: string, idToken: string ): Observable<Video>{
    return this.http.put<Video>(`http://127.0.0.1:3000/user/subscribers/path?id=`+id, '',  { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
}
