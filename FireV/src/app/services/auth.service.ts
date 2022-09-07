import { Injectable } from '@angular/core';
import { Auth, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  login() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          let credential = await signInWithPopup(
            this.auth,
            new GoogleAuthProvider()
          );
          let idToken = await credential.user.getIdToken();
          resolve(idToken);
        } catch {
          reject('Can not login with Google');
        }
      })
    );
  }

  async logOut() {
    return from(
      new Promise<string>(async (resolve, reject) => {
        try {
          await signOut(this.auth)
          resolve("log out successfull");
        }
        catch {
          reject('Can not login with Google');
        }
      })
    );
  }

  getIdToken() {
    return from(new Promise<string>(async (resolve, reject) => {
      try {
        onAuthStateChanged(this.auth, async (user) => {
          if (user) {
            let user = getAuth().currentUser;
            let idToken = await user!.getIdToken(true)
            resolve(idToken);
          }else{
            resolve("");
          }
        })
      } catch (err) {
        reject(err);
      }
    }));
  }

}

