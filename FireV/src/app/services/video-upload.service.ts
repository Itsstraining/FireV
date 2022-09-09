import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoUploadService {
  constructor(private http: HttpClient) {}
  // addVideo(file: any,idToken:string) {
  //   return this.http.post(`http://127.0.0.1:3000/upload/add`, file,{ headers: new HttpHeaders({ 'Authorization': `${idToken}` }) });
  // }
   //bản HLSSSSSSS
   public uploadVideo(idToken: string, videoForm: any, video_id: string): Observable<any> {
    return this.http.post('http://127.0.0.1:3000/media/' + `${video_id}`, videoForm, { headers: new HttpHeaders({ 'Authorization': `${idToken}` }) })
  }

}
