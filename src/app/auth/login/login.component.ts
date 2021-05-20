import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseformComponent} from '../../shared/baseform/baseform.component';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {stopLoading} from '../../shared/ui.actions';
import {UsuarioService} from '../../services/usuario.service';

//Todo Crear directiva para loading del boton
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseformComponent {

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              protected store: Store<AppState>,
              private router: Router) {
    super(store);
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
    this.formIsLoading();
    const {correo, password} = this.formGroup.value;
    this.usuarioService.userLogin(correo, password)
      .then(credenciales => {
        this.formStopLoading();
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.msg('Error', error.message, 'error');
        this.store.dispatch(stopLoading());
      });

  }
}
