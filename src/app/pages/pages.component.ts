import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  // Para obtener el selextor link del CSS
  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
    const url = localStorage.getItem('theme') || 'assets/css/colors/purple-dark.css' ; 

    // Enviamos el atributo cambiado
    this.linkTheme?.setAttribute('href', url);
  }

}
