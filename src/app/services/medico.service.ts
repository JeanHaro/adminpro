import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs
import { map } from 'rxjs';

// Environment
import { environment } from 'src/environments/environment';

// Modelo
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor (
    private http: HttpClient
  ) { }

  // TODO: Obtener el token del localStorage
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      },
    }
  }

  // TODO: Cargar medicos
  cargarNMedicos() {
    const url = `${base_url}/medicos`;

    return this.http.get<{ ok: boolean, medicos: Medico[] }>(url, this.headers).pipe(
      map((resp: { ok: boolean, medicos: Medico[] }) => resp.medicos)
    );
  }

  // TODO: Crear hospital
  crearMedico (medico: Medico) {
    const url = `${base_url}/medicos`;

    return this.http.post(url, medico, this.headers);
  }

  // TODO: Actualizar hospital
  actualizarMedico (medico: Medico) {
    const url = `${base_url}/medicos/${medico._id}`;

    return this.http.put(url, medico, this.headers);
  }

  // TODO: Eliminar hospital
  eliminarMedico (_id: string | undefined) {
    const url = `${base_url}/medicos/${_id}`;

    return this.http.delete(url, this.headers);
  }
}
