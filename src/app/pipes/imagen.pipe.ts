import { Pipe, PipeTransform } from '@angular/core';

// Environment
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | undefined, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if (!img) {
      return `${base_url}/upload/${tipo}/no-image`;
    // Si la imagen incluye https en su enlace es porque es de google y tenemos que obtener el URL
    } else if (img?.includes('https')) {
        return img;
    } else if (img) {
        return `${base_url}/upload/${tipo}/${img}`;
    } else {
        return `${base_url}/upload/${tipo}/no-image`;
    }
  }

}
