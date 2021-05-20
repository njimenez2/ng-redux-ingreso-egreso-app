import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IngresoEgreso} from '../../models/ingreso-egreso.model';
import {IngresoEgresoService} from '../../services/ingreso-egreso.service';
import {Observable, Subscription} from 'rxjs';
import {StateWithIngresoEgreso} from '../store/reducers/ingreso-egreso.reducer';
import {selectAuthUserId} from '../../auth/store/selectors';
import {selectIngresoEgreso} from '../store/selectors';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {
  list$: Observable<IngresoEgreso[]>;
  userSubcription: Subscription;
  _userId: string;

  constructor(private store: Store<StateWithIngresoEgreso>, private ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit(): void {
    this.userSubcription = this.store.select(selectAuthUserId).subscribe(userid => {
      this._userId = userid;
    });
    this.list$ = this.store.select(selectIngresoEgreso);
  }

  ngOnDestroy(): void {
    this.userSubcription?.unsubscribe();
  }

  borrar(id: string) {
    const path = `user/${this._userId}/ingreso-egresos`;
    this.ingresoEgresoService.deleteDoc(id, path);
  }
}
