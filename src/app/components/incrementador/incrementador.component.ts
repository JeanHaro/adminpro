import { Component, Input } from '@angular/core';

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

  // Crearnos un get que se llame getPorcentaje()
  // Obtener el porcentaje
  /* get getPorcentaje() {
    return `${this.progreso}%`;
  } */

  // Es bueno tiparlo para que typescript ayude con los valores
  cambiarValor (valor: number) {
    // Si el progreso es mayor a 100
    if (this.progreso >= 100 && valor >= 0) {
      return this.progreso = 100;
    }

    // Si el progreso es menor a 0
    if (this.progreso <= 0 && valor < 0) {
      return this.progreso = 0;
    }

    return this.progreso = this.progreso + valor;
  }

}
