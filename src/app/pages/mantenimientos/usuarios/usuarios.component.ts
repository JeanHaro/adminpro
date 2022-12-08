import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  // Variables
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];

  constructor (private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.cargarUsuarios(0)
    .subscribe({
      next: ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
      }
    })
  }

}
