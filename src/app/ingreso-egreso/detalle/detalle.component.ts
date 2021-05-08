import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {IngresoEgreso} from '../../models/ingreso-egreso.model';
import {IngresoEgresoService} from '../../services/ingreso-egreso.service';
import { Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit, OnDestroy {
  list: IngresoEgreso [] = [];
  subcription: Subscription;
  _userId: string;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit(): void {
    this.subcription = this.store.pipe(
      filter(({auth, ingresoEgreso}) => auth.user != null)
    ).subscribe(({auth, ingresoEgreso}) => {
      this._userId = auth.user.id;
      this.list = ingresoEgreso.items;
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  borrar(id: string) {
    let path = `user/${this._userId}/ingreso-egresos`;
    this.ingresoEgresoService.deleteDoc(id, path);
  }
}
