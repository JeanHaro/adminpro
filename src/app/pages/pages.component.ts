import { Component, OnInit } from '@angular/core';

// Servicios
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor (private settingService: SettingsService) { }

  ngOnInit(): void {
    /* const url = localStorage.getItem('theme') || 'assets/css/colors/purple-dark.css' ; 

    // Enviamos el atributo cambiado
    this.linkTheme?.setAttribute('href', url); */
  }

}
