import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: [ './nopagefound.component.css' ]
})
export class NopagefoundComponent {

  // Obtener el año actual
  year = new Date().getFullYear()
}
