import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseformComponent} from '../../shared/baseform/baseform.component';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseformComponent {

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    super();
  }

  init(): void {
    this.formGroup = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const {correo, password} = this.formGroup.value;
    this.authService.loginUsuario(correo, password)
      .then(credenciales => {
        this.router.navigate(['/']);
      })
      .catch(error => this.error('Error', error.message));

  }
}
