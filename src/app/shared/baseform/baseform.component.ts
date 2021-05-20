import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import Swal, {SweetAlertIcon} from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {Subscription} from 'rxjs';
import {isLoading, stopLoading} from '../ui.actions';


@Component({
  selector: 'app-baseform',
  template: ''
})
export class BaseformComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  isLoading: boolean;
  uiSubscription: Subscription;

  constructor(protected store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.init();
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
    this.destroy();
  }

  init(): void {
    console.log('no implementado');
  }

  destroy(): void {
    console.log('no implementado');
  }

  validInput(field: string): boolean {
    return this.formGroup.get(field).valid;
  }

  formIsLoading(): void {
    this.store.dispatch(isLoading());
  }

  formStopLoading(): void {
    this.store.dispatch(stopLoading());
  }

  msg(title: string, text: string, icon: SweetAlertIcon) {
    Swal.fire({
      icon,
      title,
      text
    });
  }
}




