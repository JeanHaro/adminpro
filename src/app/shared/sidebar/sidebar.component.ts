import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // Variables
  menuItems: any[];
  public usuario: Usuario;

  constructor (
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) { 
    this.menuItems = sidebarService.menu;
    // TODO: Obtener los datos del modelo de usuario incluyendo sus get y set
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
