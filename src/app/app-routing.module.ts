import { NgModule } from '@angular/core';
/* CommonModule - nos permite realizar *ngIf y *ngFor */ 
// import { CommonModule } from '@angular/common';

/* RouterModule - es lo que necesitamos exportar para que otro modulo lo pueda disponer de el */
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

// Rutas de la aplicación
const routes: Routes = [
  /* Rutas protegidas */
  /* path inicial */
  { 
    path: '', 
    component: PagesComponent,
    /* Rutas hijas */ 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },
      /* Cuando estoy en la ruta con el slash vacío va a redireccionar automáticamente al dashboard */
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

  /* Rutas publicas */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* Si es que la ruta que se coloca en el slash, no es de ninguno de acá se va a redirigir al componente de Nopagefound */
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  imports: [
    /* CommonModule */
    // forRoot - es para rutas principales 
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
