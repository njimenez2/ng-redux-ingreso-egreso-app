import {Injectable} from '@angular/core';
import {FirebaseService} from '../firebase/services/firebase.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {setUser, unSetUser} from '../auth/auth.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {User} from '../firebase/models/User';
import {FirebaseAuthService} from '../firebase/services/firebase-auth.service';
import {Subscription} from 'rxjs';
import {unSetItem} from '../ingreso-egreso/ingreso-egreso.actios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends FirebaseService {
  userSubcription: Subscription;

  constructor(public firestore: AngularFirestore,
              public firebaseAuthService: FirebaseAuthService,
              private store: Store<AppState>) {
    super('user/', firestore);
  }

  createUser(userModel: User) {
    return this.firebaseAuthService.createUserWithEmailAndPassword(userModel.mail, userModel.password).then(({user}) => {
      userModel.password = '*****';
      this.createDoc(userModel, '', user.uid);
    });

  }

  userLogin(mail: string, password: string) {
    return this.firebaseAuthService.signInWithEmailAndPassword(mail, password);
  }

  userAuthListener(): void {
    this.firebaseAuthService.authListener().subscribe(fuser => {
      if (fuser) {
        console.log(fuser.uid);
        // actualizar el state de mis datos del usuario
        this.userSubcription = this.getDoc(fuser.uid).subscribe((firestoreUser: any) => {
          if (firestoreUser) {
            const user = User.fromFirebase(firestoreUser);
            this.store.dispatch(setUser({user}));
          }
        });

      } else {
        if (this.userSubcription) {
          this.userSubcription.unsubscribe();
        }
        this.store.dispatch(unSetItem());
        this.store.dispatch(unSetUser());
      }
    });
  }
}
