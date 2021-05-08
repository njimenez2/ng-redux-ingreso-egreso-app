import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {unSetUser} from '../../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public fireAuth: AngularFireAuth,
              public firestore: AngularFirestore) {
  }

  authListener() {
     return this.fireAuth.authState;
  }

  signInWithEmailAndPassword(mail: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(mail, password);
  }

  signOut(): Promise<void> {
    return this.fireAuth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.fireAuth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

  createUserWithEmailAndPassword(mail: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(mail, password);
  }

}
