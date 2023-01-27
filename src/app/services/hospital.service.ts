import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Rxjs
import { map } from 'rxjs';

// Environments
import { environment } from 'src/environments/environment';

// Modelos
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor (
    private http: HttpClient,
    
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

  // TODO: Cargar usuarios
  cargarHospitales() {
    const url = `${base_url}/hospitales`;

    return this.http.get<{ ok: boolean, hospitales: Hospital[] }>(url, this.headers).pipe(
      map((resp: { ok: boolean, hospitales: Hospital[] }) => resp.hospitales)
    );
  }
}
