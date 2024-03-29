import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];
  }

  /* menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      // las otras rutas
      submenu: [
        { titulo: 'Main', url:'/' },
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'Promesas', url: 'promesas' },
        { titulo: 'Rxjs', url: 'rxjs' }
      ]
    },
    // Otro dato en el sidebar
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      // las otras rutas
      submenu: [
        { titulo: 'Usuarios', url:'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales'},
        { titulo: 'Médicos', url: 'medicos' },
      ]
    }
  ] */

  constructor() { }
}
