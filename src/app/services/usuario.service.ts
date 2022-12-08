import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';

// Rxjs
import { tap, map, catchError, delay } from 'rxjs/operators';

// Modelos
import { Usuario } from '../models/usuario.model';

// Interfaces
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

// Environment
import { environment } from 'src/environments/environment';

declare const google: any;

// Obtener el URL para hacer peticiones
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // Variables
  public usuario!: Usuario;

  constructor (
    private http: HttpClient,
    private router: Router
  ) { }

  // TODO: Obtener el token del localStorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // TODO: Cerrar sesión
  logout () {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  // TODO: Validamos el token
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      // Acá se coloca el x-token
      headers: {
        'x-token': this.token
      }
    }).pipe(
      // En la respuesta viene el token
      // map() puede llegar a enviar antes que un tap()
      map((resp: any) => {
        const {
          email,
          google,
          nombre,
          role,
          img = '',
          uid
        } = resp.usuarioDB;
        
        // Instancia de usuario
        this.usuario = new Usuario(nombre, email, '', role, google, img, uid);

        console.log(resp);
        localStorage.setItem('token', resp.token)

        return true;
      }),
      // of() - va a retornar un nuevo observable
      catchError(error => of(false))
    );
  }

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

  // TODO: Actualizar perfil
  actualizarPerfil (data: { email: string, nombre: string, role?: string }) {
    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })
  }

  // TODO: Iniciar sesión
  login (formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      // tap() - va a recibir lo que responda la petición
      tap((resp: any) => {
        // Primer parámetro - es la llave donde lo vamos a guardar
        // Segundo parámetro - es lo que quiero grabar y solo puede almacenar string
        localStorage.setItem('token', resp.token);
      })
    )
  }

  // TODO: Iniciar sesión en Google
  loginGoogle (token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      // tap() - va a recibir lo que responda la petición
      tap((resp: any) => {
        // Primer parámetro - es la llave donde lo vamos a guardar
        // Segundo parámetro - es lo que quiero grabar y solo puede almacenar string
        localStorage.setItem('token', resp.token);
      })
    )
  }

  // TODO: Cargar usuarios
  cargarUsuarios (desde: number = 0) {
    return this.http.get<CargarUsuario>(`${base_url}/usuarios?desde=${desde}`, this.headers)
    .pipe(
      map(resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
        )

        return {
          total: resp.total,
          usuarios,
        };
      })
    )
}
}
