import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    let i = 0;

    // $ - indicar que es un observable
    // observer es de tipo subscriber
    // El observer es el que va a estar emitiendo los valores. cuando termina, cuando da error
    // Este subscriber va a decir como esta el observable y que está fluyendo a través de el
    const obs$ = new Observable( observer => {
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
          observer.error('i llego al valor de 2');
        }


      }, 1000);
    });

    // Esto es todo lo que necesita para que el observable empiece a trabajar
    obs$.subscribe({
      next: valor => console.log('Subs:', valor), 
      error: error => console.warn('Error:', error),
      complete: () => console.info('Obs terminado') 
    });
    // (1) - En consola aparece tick
    // En consola cada segundo aparece Subs: 0, Subs: 1, Subs: 2, y aumenta cada segundo
    // Subs: 0, Subs: 1, Subs: 2, Subs: 3, Subs: 4, Obs terminado 
  }

}
