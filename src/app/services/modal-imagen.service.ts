import { Injectable } from '@angular/core';

// Environment
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  // _ - es un caracter cualquiera para indicar que es una propiedad privada
  private _ocultarModal: boolean = true;
  public tipo!: string;
  public id!: string;
  public img!: string;

  // Obtenerla y nadie lo va a poder a cambiar acá
  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string,
    img: string = 'no-img' 
  ) {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    // http://localhost:3000/api/upload/usuarios/492ded91-8cca-45c9-b4b9-cc360704dc54.jpg
    // Si la imagen incluye https
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
