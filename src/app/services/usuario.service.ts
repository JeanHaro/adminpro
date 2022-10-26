import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

// Rxjs
import { tap } from 'rxjs/operators';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

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
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      // tap() - va a recibir lo que responda la petición
      tap((resp: any) => {
        // Primer parámetro - es la llave donde lo vamos a guardar
        // Segundo parámetro - es lo que quiero grabar y solo puede almacenar string
        localStorage.setItem('token', resp.token)
      })
    )
  }

  // TODO: Iniciar sesión
  login (formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      // tap() - va a recibir lo que responda la petición
      tap((resp: any) => {
        // Primer parámetro - es la llave donde lo vamos a guardar
        // Segundo parámetro - es lo que quiero grabar y solo puede almacenar string
        localStorage.setItem('token', resp.token)
      })
    )
  }
}
