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

  constructor (public modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
  }

  // Ocultar modal
  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }
}
