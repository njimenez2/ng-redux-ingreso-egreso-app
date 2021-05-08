import {Component} from '@angular/core';
import {UsuarioService} from './services/usuario.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ingreso-egreso';

  constructor(private usuarioService: UsuarioService) {

    this.usuarioService.userAuthListener();
  }

}
