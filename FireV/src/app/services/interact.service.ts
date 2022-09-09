import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractService {

  isCheck: boolean = false;
  callbacks: any[] = []
  constructor() {
  }
  turnOn() {
    this.isCheck = true;
    this.callbacks.forEach((callback) => {
      callback(this.isCheck)
    })
  }
  turnOff() {
    this.isCheck = false;
    this.callbacks.forEach((callback) => {
      callback(this.isCheck)
    })
  }

  listenToggleMenu(callback: (value: any) => void): void {
    this.callbacks.push(callback)
  }

}
