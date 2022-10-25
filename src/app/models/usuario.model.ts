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
}