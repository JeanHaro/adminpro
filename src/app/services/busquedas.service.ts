import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Environment
import { environment } from 'src/environments/environment';

// Modelos
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  // TODO: Indicar los valores para la creación de usuarios
  private transformarUsuarios (resultados: any[]): Usuario[] {
    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.role, user.google, user.img, user.uid)
    );
  }

  // TODO: Indicar los valores para la creación de hospitales
  private transformarHospitales (resultados: any[]): Hospital[] {
    return resultados.map(
      hosp => new Hospital(hosp.nombre, hosp._id, hosp.img, hosp.usuario)
    );
  }

  // TODO: Indicar los valores para la creación de medicos
  private transformarMedicos (resultados: any[]): Medico[] {
    return resultados.map(
      hosp => new Medico(hosp.nombre, hosp._id, hosp.img, hosp.usuario)
    );
  }

  // TODO: Buscar todo
  busquedaGlobal (termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers);
  }

  // TODO: Buscar usuarios
  buscar (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string
  ) {
    return this.http.get<any[]>(`${base_url}/todo/coleccion/${tipo}/${termino}`, this.headers).pipe(
      map( (resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados)
            break;
          case 'hospitales':
            return this.transformarHospitales(resp.resultados)
            break;
          case 'medicos':
            return this.transformarMedicos(resp.resultados)
            break;
          default:
            return []
        }
      })
    )
  }
}
