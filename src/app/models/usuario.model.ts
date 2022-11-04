import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {
    constructor (
        public nombre: boolean,
        public email: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string
    ) {}

    get imagenUrl() {
        // Si la imagen incluye https en su enlace es porque es de google y tenemos que obtener el URL
        if (this.img?.includes('https')) {
            return this.img;
        }

        // Si existe la imagen
        if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}