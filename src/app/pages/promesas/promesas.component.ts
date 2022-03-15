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
    // this.getUsuarios();  
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    })
  }

  getUsuarios() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      // then() - información propia de cuando se resuelva esta peticion
      // El json regresa otra promesa
      .then(resp => resp.json())
      // resolve manda lo que va a mostrar
      .then(body => resolve(body.data))
    })

    // retorna el body.data
    return promesa;
  }

}
