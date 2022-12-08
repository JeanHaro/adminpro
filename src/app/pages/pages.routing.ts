// Rutas internas de pages
// snippet para hacer todo esto - (ng-router)
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guardian
import { AuthGuard } from '../guards/auth.guard';

// Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';

const routes: Routes = [
    /* Rutas protegidas */
  /* path inicial */
    { 
        // El path que tendrán estas rutas será el dashboard
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        /* Rutas hijas */ 
        children: [
            // Ruta por defecto, ya que es el dashboard
            // data - para poder mostrarlo en las páginas, argumento que se lee para sabe en qué pagina te encuentras
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuario de aplicación' } },

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
