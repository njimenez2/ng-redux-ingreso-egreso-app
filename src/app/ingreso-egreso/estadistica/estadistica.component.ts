import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IngresoEgreso} from '../../models/ingreso-egreso.model';

import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';
import {StateWithIngresoEgreso} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html'
})
export class EstadisticaComponent implements OnInit {
  totalEgreso = 0;
  totalIngreso = 0;
  ingreso = 0;
  egreso = 0;

  public doughnutChartLabels: Label[] = ['Ingreso', 'Egreso'];
  public doughnutChartData: MultiDataSet = [
    [0, 0]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<StateWithIngresoEgreso>) {
  }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe(({items}) => {
        this.calcularEstadisticas(items);
      }
    );
  }

  calcularEstadisticas(items: IngresoEgreso[]) {
    this.totalEgreso = 0;
    this.totalIngreso = 0;
    this.ingreso = 0;
    this.egreso = 0;
    for (const item of items) {
      if (item.tipo === 'ingreso') {
        this.totalIngreso += item.monto;
        this.ingreso++;
      } else {
        this.totalEgreso += item.monto;
        this.egreso++;
      }
    }
    this.doughnutChartData = [[this.totalIngreso, this.totalEgreso]];

  }

}
