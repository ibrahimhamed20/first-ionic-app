import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _auth: AngularFireAuth) { }

  recoverPassword(email): Observable<void> {
    return new Observable<void>(observer => {
      this._auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error({ error });
        observer.complete();
      });
    })
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this._auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        this._auth.signInWithEmailAndPassword(email, password)
          .then((firebaseUser: firebase.auth.UserCredential) => {
            observer.next({ email, id: firebaseUser.user.uid });
            observer.complete();
          }).catch(error => {
            observer.error({ error });
            observer.complete();
          });
      });
    })
  }
}
