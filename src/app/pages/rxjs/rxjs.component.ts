import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    // $ - indicar que es un observable
    // observer es de tipo subscriber
    // El observer es el que va a estar emitiendo los valores. cuando termina, cuando da error
    // Este subscriber va a decir como esta el observable y que está fluyendo a través de el
    const obs$ = new Observable( observer => {
      let i = -1;
      // El observer observa que no hay nada suscrito entonces no hará nada
      // Ni realizará funciones
      const intervalo = setInterval(() => {
        // (1) - console.log('tick');
        i++;
        // next() - el siguiente valor que queremos emitir
        observer.next(i);
        
        // Finalizar el Observable
        if (i === 4) {
          // cierra el intervalo
          clearInterval(intervalo);
          // observer.complete - indica que se completo el observer
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          // console.log('i = 2 ..... error');
          observer.error('i llego al valor de 2');
        }


      }, 1000);
    });

    // Esto es todo lo que necesita para que el observable empiece a trabajar
    // pipe() - transformar la información que fluye a través del observable
    obs$.pipe(
      // retry() // va a estar intentando una y otra vez hasta que lo logre 
      // retry(1) // Lo intenta una vez más
      retry(2) // Lo intenta dos veces más
    ).subscribe({
      next: valor => console.log('Subs:', valor), 
      error: error => console.warn('Error:', error),
      complete: () => console.info('Obs terminado') 
    });
    /*
    let i; fuera del Observable
    Subs: 0
    Subs: 1
    Subs: 2
    i = 2 ..... error
    Subs: 4
    Obs terminado
    */

    /*
    let i; dentro del Observable
    retry(1)
    Subs: 0
    Subs: 1
    Subs: 2
    Subs: 0
    Subs: 1
    Subs: 2
    Error: i llego al valor de 2
    */

    /*
    retry(2)
    Subs: 0
    Subs: 1
    Subs: 2
    Subs: 0
    Subs: 1
    Subs: 2
    Subs: 0
    Subs: 1
    Subs: 2
    Error: i llego al valor de 2
    */
  }
}
