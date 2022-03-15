import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hola Mundo');
      } else {
        reject('Algo salió mal');
      }
    });

    promesa.then((mensaje) => {
      console.log(mensaje);
    })
    .catch(error => console.log('Error en mi promesa:', error));

    console.log('Fin del Init');

    /*
    // Si no se coloca el resolve en la Promise, seguirá ejecutando de manera sincrona
    const promesa = new Promise(() => {
        console.log('Hola Mundo');
    });
    console.log('Fin del Init');
    --> Hola Mundo
    --> Fin del Init

    // Si la promesa está correcta, nos ejecuta el resolve
    if -> true
    Fin del Init
    Hola mundo 

    // Sin catch nos aparece con rojo los errores
    if -> false
    Fin del Init
    core.mjs:6485 ERROR Error: Uncaught (in promise): Algo salió mal
    .....

    // Con catch, nos aparece el error solamente con el mensaje que se colocó
    if -> false
    Fin del Init
    Error en mi promesa: Algo salió mal
    */

    // La aplicación seguirá funcionando igualmente con el error que presente
  
  }

}
