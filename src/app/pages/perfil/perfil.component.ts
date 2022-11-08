import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Formularios
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Modelo
import { Usuario } from 'src/app/models/usuario.model';

// Servicios
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor (
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    // Toda la información por parte del usuario
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    // Formulario con sus validaciones y valores
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  // TODO: Actualizar el perfil
  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe({
      next: (resp) => {
        const { nombre, email } = this.perfilForm.value;

        // TODO: Actualiza todo lo que tenga que ver con el usuario.nombre y el usuario.email
        this.usuario.nombre = nombre;
        this.usuario.email = email;
      
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

  // TODO: Cambiar imagen
  cambiarImagen (file: File): any {
    this.imagenSubir = file;

    // Si se cancela para no subir imagen se coloca la imagen que tiene inicialmente
    if (!file) { 
      return this.imgTemp = null; 
    }

    // FileReader() - Leer un archivo
    const reader = new FileReader();
    // Transformar el archivo
    reader.readAsDataURL(file);

    // Mostrar el url
    reader.onloadend = () => {
      // Obtiene todo el url
      this.imgTemp = reader.result;
    }

  }

  // TODO: Subir imagen
  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    // Para actualziarlo a tiempo real
    .then(img => {
      this.usuario.img = img;

      Swal.fire('Guaradado', 'Imagen guardada', 'success')
    })
    .catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error')

      console.log(err);
    })
  }
}
