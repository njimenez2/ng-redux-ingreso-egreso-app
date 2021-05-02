import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baseform',
  template: ''
})
export class BaseformComponent implements OnInit {
  formGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    console.log('no implementado');
  }

  validInput(field: string): boolean {
    return this.formGroup.get(field).valid;
  }

  error(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title,
      text
    });
  }
}
