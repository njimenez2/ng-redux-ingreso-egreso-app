import {Component} from '@angular/core';
import {BaseformComponent} from '../shared/baseform/baseform.component';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {FormBuilder, Validators} from '@angular/forms';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.scss']
})
export class IngresoEgresoComponent extends BaseformComponent {
  tipo = 'ingreso';
  _userui: string;
  userSubcription: Subscription;

  constructor(protected store: Store<AppState>,
              private formBuilder: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService) {
    super(store);
    this.userSubcription = this.store.select('auth').pipe(
      filter(auth => auth.user != null)
    ).subscribe(user => {
      this._userui = user.user.id;

    });
  }


  init(): void {
    this.formGroup = this.formBuilder.group({
      monto: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  destroy(): void {
    this.userSubcription.unsubscribe();
  }

  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    const path = `user/${this._userui}/ingreso-egresos`;
    const {monto, descripcion} = this.formGroup.value;
    const ingresoEgreso = new IngresoEgreso('', descripcion, monto, this.tipo);
    this.ingresoEgresoService.createDoc(ingresoEgreso, path).then(obj => {
      this.formGroup.reset();
      this.msg('ok', 'Insert Ok', 'success');
      this.formStopLoading();
    }).catch(error => {
      this.msg('error', error.message, 'error');
      this.formStopLoading();
    });

  }
}
