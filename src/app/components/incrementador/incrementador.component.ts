import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  // Una propiedad o variable progreso
  // Recibir un valor desde el padre, pide valores
  // En el paréntesis del Input podemos renombrar el nombre progreso
  // Así en el padre se llama con ese renombre
  // @Input('valor') progreso: number = 50;
  @Input() progreso: number = 50;
  // Con el Input, ya le digo a Angular o ya va a saber que este componente incremetador puede recibir una propiedad desde el padre llamada progreso

  // Va a escuchar cambios para emitir
  // Los Output son de tipo EventEmitter, es una función que el componente padre va a poder ejecutar
  // Cuando se llame algo de acá, significa que el componente está disparando un evento
  // EventEmitter necesita saber que información es la que fluye a través de el, en este caso es un number
  // También en el paréntesis se le puede renombrar el nombre 
  // @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();
  
  // Es bueno tiparlo para que typescript ayude con los valores
  cambiarValor (valor: number) {
    // Si el progreso es mayor a 100
    if (this.progreso >= 100 && valor >= 0) {
      // Queremos emitir el valor acá
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    // Si el progreso es menor a 0
    if (this.progreso <= 0 && valor < 0) {
      // Queremos emitir el valor acá
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    // Queremos emitir el valor acá
    return this.valorSalida.emit(this.progreso);
  }

}
