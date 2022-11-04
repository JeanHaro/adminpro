import { Component } from '@angular/core';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public usuario: Usuario; 

  constructor (
    private usuarioService: UsuarioService
  ) { 
    // TODO: Obtener los datos del modelo de usuario incluyendo sus get y set
    this.usuario = usuarioService.usuario;
  }

  // TODO: Cerrar sesión
  logout() {
    this.usuarioService.logout();
  }
}
