import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {DetalleComponent} from './detalle/detalle.component';

import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ChartsModule} from 'ng2-charts';
import {DashboardRoutingModule} from '../dashboard/dashboard-routing.module';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {StoreModule} from '@ngrx/store';
import {ingresoEgresoReducer} from './store/reducers/ingreso-egreso.reducer';
import {IngresoEgresoKey} from './store/selectors';



@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(IngresoEgresoKey, ingresoEgresoReducer),
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    DashboardRoutingModule

  ]
})
export class IngresoEgresoModule {
}
