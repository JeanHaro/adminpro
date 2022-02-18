import { NgModule } from '@angular/core';
/* CommonModule - nos permite realizar *ngIf y *ngFor */ 
// import { CommonModule } from '@angular/common';

/* RouterModule - es lo que necesitamos exportar para que otro modulo lo pueda disponer de el */
import { RouterModule, Routes } from '@angular/router';

// Routing Modules
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// Componentes
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


// Rutas de la aplicación
const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting

  /* Si es que la ruta que se coloca en el slash, no es de ninguno de acá se va a redirigir al componente de Nopagefound */
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  imports: [
    /* CommonModule */
    // forRoot - es para rutas principales 
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
