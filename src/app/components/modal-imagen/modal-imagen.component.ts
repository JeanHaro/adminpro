import { Component, OnInit } from '@angular/core';

// Servicios
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor (public modalImagenService: ModalImagenService) { }

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
}
