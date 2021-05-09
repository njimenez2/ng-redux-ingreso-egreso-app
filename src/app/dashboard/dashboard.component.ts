import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';
import {setItem} from '../ingreso-egreso/ingreso-egreso.actios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubcription: Subscription;
  listSubcription: Subscription;

  constructor(protected store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {
  }

  ngOnInit(): void {
    this.userSubcription = this.store.select('auth').pipe(
      filter(auth => auth.user != null)
    ).subscribe(user => {
      const path = `user/${user.user.id}/ingreso-egresos`;
      this.listSubcription = this.ingresoEgresoService.listDoc(path).subscribe(list => {
        this.store.dispatch(setItem({items: list}));
      });
    });


  }

  ngOnDestroy(): void {
    this.userSubcription.unsubscribe();
    this.listSubcription.unsubscribe();
  }

}
