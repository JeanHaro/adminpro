import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Environment
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor (private http: HttpClient) { }

  // TODO: Obtener el token del localStorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  // TODO: Buscar usuarios
  buscar (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ) {
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers).pipe(
      map( (resp: any) => resp.resultados )
    )
  }
}
