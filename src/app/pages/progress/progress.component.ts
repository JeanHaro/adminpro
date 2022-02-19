import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  // Una propiedad o variable progreso
  progreso: number = 50;

  // Crearnos un get que se llame getPorcentaje()
  // Obtener el porcentaje
  get getPorcentaje() {
    return `${this.progreso}%`;
  }

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
