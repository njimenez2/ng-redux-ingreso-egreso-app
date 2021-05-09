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
import {ingresoEgresoReducer} from './ingreso-egreso.reducer';
import {dashboardReducer} from '../dashboard/dashboard.reducer';


@NgModule({
  declarations: [
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('ingresoEgreso', ingresoEgresoReducer),
    StoreModule.forFeature('dashboard23', dashboardReducer),
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    DashboardRoutingModule

  ]
})
export class IngresoEgresoModule {
}
