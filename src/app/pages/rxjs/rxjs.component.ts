import { Component } from '@angular/core';
// interval - retorna un observable, y ya viene configurado la parte del setInteval
import { Observable, interval } from 'rxjs';
// take - cuantas emisiones del observable necesitan
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    // Esto es todo lo que necesita para que el observable empiece a trabajar
    // pipe() - transformar la información que fluye a través del observable
    /* 
    this.retornaObservable().pipe(
      // retry() // va a estar intentando una y otra vez hasta que lo logre 
      // retry(1) // Lo intenta una vez más
      retry(2) // Lo intenta dos veces más
    ).subscribe({
      next: valor => console.log('Subs:', valor), 
      error: error => console.warn('Error:', error),
      complete: () => console.info('Obs terminado') 
    }); 
    */

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

    this.retornaIntervalo()
    .subscribe(
      (valor) => console.log(valor)
    )
    /*
    2
    4
    6
    8
    10
    12
    14
    16
    18
    20
    */
  }

  // función que emite un observable en base a numeros
  retornaObservable(): Observable<number> {
    let i = -1;

    // $ - indicar que es un observable
    // observer es de tipo subscriber
    // El observer es el que va a estar emitiendo los valores. cuando termina, cuando da error
    // Este subscriber va a decir como esta el observable y que está fluyendo a través de el
    // <number> - porque el observable va a emitir numeros
    const obs$ = new Observable<number>( observer => {
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
          // console.log('i = 2 ..... error');
          observer.error('i llego al valor de 2');
        }


      }, 1000);
    });

    return obs$;
  }

  retornaIntervalo(): Observable<number> {
    return interval(500)
            .pipe(
              map( valor =>  valor + 1), // transformar datos
              filter(valor => valor % 2 === 0), // filtrar datos
              take(10), // 10 valores, siestá primero solo buscará pares del 1 al 10
            );
  }
}
