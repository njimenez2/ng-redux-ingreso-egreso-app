import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BaseformComponent} from '../../shared/baseform/baseform.component';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {UsuarioService} from '../../services/usuario.service';


//Todo Crear directiva para loading del boton
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseformComponent {
  constructor(private formBuilder: FormBuilder,
              protected store: Store<AppState>,
              private usuarioService: UsuarioService,
              private router: Router) {
    super(store);
  }


  init(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  crearUsuario(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.formIsLoading();
    this.usuarioService.createUser(this.formGroup.value)
      .then(credenciales => {
        this.formStopLoading();
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.formStopLoading();
        this.msg('Error', error.message, 'error');
      });
  }
}
