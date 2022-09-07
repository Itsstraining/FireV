import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class AddVideoService {

  constructor(private http: HttpClient) { }
  createVideo(video: any,idToken: string){
    console.log(video)
    return this.http.post<Video>("http://127.0.0.1:3000/video/send", video,{ headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  getVideo(): Observable<Video[]>{
    return this.http.get<Video[]>(`http://127.0.0.1:3000/video/all`);
  }
  getVideoByIdDb(id: string): Observable<Video>{
    return this.http.get<Video>(`http://127.0.0.1:3000/video/play?id=`+id);
  }
  getAllExceptId(id: string): Observable<Video[]>{
    return this.http.get<Video[]>(`http://127.0.0.1:3000/video/all/except?id=`+id);
  }
  updateViews(id: string): Observable<Video>{
    return this.http.put<Video>(`http://127.0.0.1:3000/video/views/path?id=`+id, '');
  }

  updateLikes(id: string, idToken: string): Observable<Video>{
    return this.http.put<Video>(`http://127.0.0.1:3000/video/likes/path?id=`+id, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  updateUnlikes(id: string, idToken: string): Observable<Video>{
    return this.http.put<Video>(`http://127.0.0.1:3000/video/unlikes/path?id=`+id, '', { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  updateDislikes(id: string, idToken: string ): Observable<Video>{
    return this.http.put<Video>(`http://127.0.0.1:3000/video/dislikes/path?id=`+id, '',  { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }
  updateUndislikes(id: string, idToken: string ): Observable<Video>{
    return this.http.put<Video>(`http://127.0.0.1:3000/video/undislikes/path?id=`+id, '',  { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  }

}
