import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})

export class Grafica1Component {
  color: string[] = [ '#0096c7', '#d62828', '#FFB414' ];

  public venta = {
    labels: [ 'Venta 1', 'Venta 2', 'Venta 3' ],
    datasets: [ {
      data: [200, 350, 100],
      backgroundColor: this.color
    }]
  }
  
  public productos = {
    labels: [ 'Producto 1', 'Producto 2', 'Producto 3' ],
    datasets: [ {
      data: [500, 250, 250],
      backgroundColor: this.color
    }]
  }

  public categorias = {
    labels: [ 'Categoria 1', 'Categoria 2', 'Categoria 3' ],
    datasets: [ {
      data: [350, 200, 600],
      backgroundColor: this.color
    }]
  }

  public usuarios = {
    labels: [ 'Usuario 1', 'Usuario 2', 'Usuario 3' ],
    datasets: [ {
      data: [200, 450, 100],
      backgroundColor: this.color
    }]
  }
}