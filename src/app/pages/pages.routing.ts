// Rutas internas de pages
// snippet para hacer todo esto - (ng-router)
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Guardian
import { AuthGuard } from '../guards/auth.guard';

// Componentes
import { PagesComponent } from './pages.component';

const routes: Routes = [
    /* Rutas protegidas */
  /* path inicial */
    { 
        // El path que tendrán estas rutas será el dashboard
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        // Para que funcione el lazyLoad
        canLoad: [AuthGuard],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
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
