import { Injectable } from '@angular/core';
import Hls from 'hls.js';

@Injectable({
  providedIn: 'root'
})
export class HlsService {
  hls = new Hls();
  video!: HTMLVideoElement;
  constructor() { }
}
