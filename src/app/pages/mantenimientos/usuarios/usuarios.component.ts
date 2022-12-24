import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Modelos
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

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
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor (
    private usuarioService: UsuarioService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService
  ) { }

  // Para obtener el email del usuario que tenemos registrado
  public user: string = this.usuarioService.usuario.email;

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
          this.usuariosTemp = usuarios
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
  buscar (termino: string = '') {
    // Si está vacio entonces no regrese nada
    if (termino.length === 0) {
      return this.usuarios =  this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
    .subscribe({
      next: (resp) => {
        this.usuarios = resp;
      }
    });

    return [];
  }

  // TODO: Eliminar usuario
  eliminarUsuario (usuario: Usuario) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está apunto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario(usuario)
        .subscribe({
          next: (resp) => {
              Swal.fire(
                'Usuario borrado', 
                `${ usuario.nombre } fue eliminado correctamente`, 
                'success' 
              );

              this.cargarUsuarios();
          },
          error: (err) => Swal.fire('Error', err.error.msg, 'error')
        })
      }
    })
  } 

  // TODO: Cambiar role
  cambiarRole (usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
    .subscribe({
      next: (resp) => {
        console.log(resp)
      }
    })
  }

  // TODO: Abrir el modal
  abrirModal (usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal();
  }
}
