import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // _ - es un caracter cualquiera para indicar que es una propiedad privada
  private _ocultarModal: boolean = true;

  // Obtenerla y nadie lo va a poder a cambiar acá
  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
