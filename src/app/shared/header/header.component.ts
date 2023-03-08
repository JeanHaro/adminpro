import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    private usuarioService: UsuarioService,
    private router: Router
  ) { 
    // TODO: Obtener los datos del modelo de usuario incluyendo sus get y set
    this.usuario = usuarioService.usuario;
  }

  // TODO: Cerrar sesión
  logout() {
    this.usuarioService.logout();
  }

  // Buscar
  buscar (termino: string) {
    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`)
  }
}
