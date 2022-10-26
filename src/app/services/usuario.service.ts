import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';

// Environment
import { environment } from 'src/environments/environment';

// Obtener el URL para hacer peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor (private http: HttpClient) { }

  // TODO: Crear usuario
  crearUsuario (formData: RegisterForm) {
    // Como es una petición post tenemos que mandar la data, y eso se envía en el segúndo argumento
    // Como es una promesa el post(), tendríamos que subscrirnos a esto
    // Pero colocando el return haríamos el subscribe en el otro archivo donde haremos la petición 
    return this.http.post(`${base_url}/usuarios`, formData);
  }
}
