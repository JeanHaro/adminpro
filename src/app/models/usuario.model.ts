import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {
    constructor (
        public nombre: boolean,
        public email: string,
        public password?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public google?: boolean,
        public img?: string,
        public uid?: string
    ) {}

    get imagenUrl() {
        if (!this.img) {
            return `${base_url}/upload/usuarios/no-image`;

        // Si la imagen incluye https en su enlace es porque es de google y tenemos que obtener el URL
        } else if (this.img?.includes('https')) {
            return this.img;
        } else if (this.img) {
            return `${base_url}/upload/usuarios/${this.img}`;
        } else {
            return `${base_url}/upload/usuarios/no-image`;
        }
    }
}