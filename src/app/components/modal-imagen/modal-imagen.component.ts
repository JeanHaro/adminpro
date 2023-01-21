import { Component, OnInit } from '@angular/core';

// SweetAlert2
import Swal from 'sweetalert2';

// Servicios
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor (
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  // Ocultar modal
  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    // Para actualziarlo a tiempo real
    .then(img => {
      Swal.fire('Guaradado', 'Imagen guardada', 'success');

      // --> Emitir
      this.modalImagenService.nuevaImagen.emit(img);

      this.cerrarModal();
    })
    .catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error')

      console.log(err);
    })
  }
}
