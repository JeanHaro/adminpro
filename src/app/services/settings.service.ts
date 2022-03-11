import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Para obtener el selextor link del CSS
  // No sirve colocarlo en el ngOnInit, porque cuando la aplicación de angular se crea, ya existe esto
  // Si se crea de manera dinámica usar el ngOnInit
  private linkTheme = document.querySelector('#theme');

  constructor() { 
    const url = localStorage.getItem('theme') || 'assets/css/colors/purple-dark.css' ; 

    // Enviamos el atributo cambiado
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme ( theme: string ) {
    const url = `assets/css/colors/${theme}.css`;

    // Enviamos el atributo cambiado
    this.linkTheme?.setAttribute('href', url);

    // Guardar en el LocalStorage
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  /* No es recomendable manejar con el DOM desde servicios, pero como no son muchos archivos HTML es pasable, pero cuando hay muchos 
  elementos no es recomendable usarlo en servicios */
  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `assets/css/colors/${btnTheme}.css`;

      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    })
  }

}
