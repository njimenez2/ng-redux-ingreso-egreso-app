import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {FirebaseService} from '../firebase/services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService extends FirebaseService {


  constructor(public firestore: AngularFirestore,
              private  store: Store<AppState>) {
    super('user/', firestore);

  }

  listDoc(path: string) {
    this.collection = this.firestore.collection(path, ref =>
      ref.orderBy('tipo')
    );
    return this.collection.valueChanges();
  }
}

