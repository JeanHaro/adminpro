import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  // Propiedades
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor (
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // TODO: Cargar usuarios
  cargarUsuarios () {
    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe({
      next: ({ total, usuarios }) => {
        this.totalUsuarios = total;

        // Si el tamaño de los usuarios es diferente de 0, entonces cambias los registros
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
        }

        this.cargando = false;
      }
    })
  }

  // TODO: Cambiar pagina
  cambiarPagina (valor: number) {
    this.desde += valor;

    // Si es menor a 0, entonces el desde será 0
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor; 
    }

    this.cargarUsuarios();
  }

  // TODO: Buscar
  buscar (termino: string) {
    this.busquedaService.buscar('usuarios', termino)
    .subscribe({
      next: (resp) => {
        this.usuarios = resp;
      }
    })
  }
}
