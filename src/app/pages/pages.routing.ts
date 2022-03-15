// Rutas internas de pages
// snippet para hacer todo esto - (ng-router)
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

const routes: Routes = [
    /* Rutas protegidas */
  /* path inicial */
    { 
        // El path que tendrán estas rutas será el dashboard
        path: 'dashboard', 
        component: PagesComponent,
        /* Rutas hijas */ 
        children: [
            // Ruta por defecto, ya que es el dashboard
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
            { path: 'account-settings', component: AccountSettingsComponent },
            { path: 'promesas', component: PromesasComponent }
            /* Cuando estoy en la ruta con el slash vacío va a redireccionar automáticamente al dashboard */
            // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Esto se colocará en el Routing general (app-routing) por el path vacio
        ]
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
