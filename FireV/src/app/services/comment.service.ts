import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(id: string, comment: any, idToken: string): Observable<Comment>{
    return this.http.post<Comment>(`http://127.0.0.1:3000/comment/send?id=`+id, comment,  { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

  getComment(id: string): Observable<Comment[]>{
    return this.http.get<Comment[]>(`http://127.0.0.1:3000/comment/video/path?id=`+id);
  }

  updateLike(id: string, idToken: string): Observable<Comment>{
    return this.http.put<Comment>(`http://127.0.0.1:3000/comment/like/path?id=`+id, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  updateUnlike(id: string, idToken: string): Observable<Comment>{
    return this.http.put<Comment>(`http://127.0.0.1:3000/comment/unlike/path?id=`+id, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  updateDislike(id: string, idToken: string ): Observable<Comment>{
    return this.http.put<Comment>(`http://127.0.0.1:3000/comment/dislike/path?id=`+id, '',  { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  updateUndislike(id: string, idToken: string ): Observable<Comment>{
    return this.http.put<Comment>(`http://127.0.0.1:3000/comment/undislike/path?id=`+id, '',  { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
}
