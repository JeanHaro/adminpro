import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
// Para utilizar ngModel tenemos que importar este FormsModule en el modulo.ts
import { FormsModule } from '@angular/forms';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  // Solo va a funcionar interna en el mismo modulo
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  // Exportamos los componentes para poder usarlos en otros lados
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    // Este es el que incluye la directivas del ngFor y ngIf, entre otras cosas
    CommonModule,
    // Importamos el modulo SharedModulo
    SharedModule,
    // AppRoutingModule
    RouterModule, // Otra forma de importar el RouterModule
    FormsModule
  ]
})
export class PagesModule { }
