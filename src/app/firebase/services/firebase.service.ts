import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Model} from '../models/Model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  collection: AngularFirestoreCollection<any>;

  constructor(private basepath: string, public firestore: AngularFirestore) {
    this.collection = this.firestore.collection(this.basepath);
  }

  /**
   * Obtener documento de firebase.
   * @param id Identificador del documento de firebase
   * @param path path para acceder al documento,
   * si este cambio tiene valor se ignora el basepath enviado en el constructor
   */
  getDoc(id: string, path?: string) {
    if (path && path !== '') {
      this.collection = this.firestore.collection(path);
    }
    return this.collection.doc(id).valueChanges();
  }

  /**
   * Obtener documento de firebase.
   * @param data Datos para guardar en Firebase
   * @param path path en el cual se va guardar el Documento,
   * si este cambio tiene valor se ignora el basepath enviado en el constructor
   * @param id Identificador del documento de firebase, si no se envia se genera un id automatico por fb.
   */
  createDoc(data: Model, path?: string, id?: string) {
    let uid = '';
    if (path && path !== '') {
      this.collection = this.firestore.collection(path);
    }
    // si no pasan id genero uno
    if (id && id !== '') {
      uid = id;
    } else {
      uid = this.firestore.createId();
    }
    // seteo el id del documento dentro del campo id del documento
    data.id = uid;
    return this.collection.doc(uid).set({...data});
  }

  /**
   * Obtener documento de firebase.
   * @param id Identificador del documento de firebase
   * @param path path para acceder al documento,
   * si este cambio tiene valor se ignora el basepath enviado en el constructor
   */
  deleteDoc(id: string, path?: string) {
    if (path && path !== '') {
      this.collection = this.firestore.collection(path);
    }
    return this.collection.doc(id).delete();
  }

  /**
   * Obtener documento de firebase.
   * @param path path de la collection
   */
  //todo agregar limit, filtros
  listDoc(path: string) {
    this.collection = this.firestore.collection(path);
    return this.collection.valueChanges();
  }

}
