import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario.models';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              public firestore: AngularFirestore) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
    });
  }

  crearUsuario(usuario: Usuario) {
    return this.auth.createUserWithEmailAndPassword(usuario.correo, usuario.password)
      .then(({user}) => {
        usuario.uid = user.uid;
        return this.firestore.doc(`${user.uid}/usuario`).set({...usuario});
      });
  }

  loginUsuario(correo: string, password: string) {
    return this.auth.signInWithEmailAndPassword(correo, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }
}
