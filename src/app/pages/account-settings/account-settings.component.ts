import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // Para obtener el selextor link del CSS
  public linkTheme = document.querySelector('#theme');

  constructor() { }

  ngOnInit(): void {
  }

  changeTheme ( theme: string ) {
    const url = `assets/css/colors/${theme}.css`;

    // Enviamos el atributo cambiado
    this.linkTheme?.setAttribute('href', url);

    // Guardar en el LocalStorage
    localStorage.setItem('theme', url);
  }
}
