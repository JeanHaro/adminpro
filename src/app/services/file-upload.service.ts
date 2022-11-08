import { Injectable } from '@angular/core';

// Environment
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // TODO: Actualizar foto
  // archivo - que el archivo sea File
  // tipo - es para controlar varias opciones de tipos 
  // id - es el id del elemento que queremos actualizar
  async actualizarFoto (
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string | undefined
  ) {
    // Si se maneja un async y await es bueno usar un try catch
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;

      // La data que enviaremos fetch
      const formData = new FormData();

      // El archivo que vamos a mandar
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        // Método de la petición
        method: 'PUT',
        // Token
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        // Mandar información al backend mediante la petición fetch
        body: formData
      });

      // Data
      const data = await resp.json();

      console.log(data);
      return 'nombre de la imagen'
    } catch (error) {
      console.log(error);
      return false;
    }
  } 
}
