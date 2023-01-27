// Solo va a servir para saber cierta información,  para extraer las propiedades
// Es privado porque no lo estamos exportando
interface _hospitalUser {
    _id: string;
    nombre: string;
    img: string;
}

export class Hospital {
    constructor (
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _hospitalUser,
    ) {}
}