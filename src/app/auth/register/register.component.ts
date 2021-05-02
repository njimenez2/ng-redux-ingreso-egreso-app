import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {BaseformComponent} from '../../shared/baseform/baseform.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseformComponent {
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    super();
  }


  init(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  crearUsuario() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.crearUsuario(this.formGroup.value)
      .then(credenciales => {
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch(error => this.error('Error', error.message));
  }
}
