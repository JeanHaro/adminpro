import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { tap } from 'rxjs/operators';

// Servicios
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private usuarioService: UsuarioService,
    private router: Router
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // console.log('Paso por el canActivate del guard');

    // TODO: Verificar si hay token
    return this.usuarioService.validarToken().pipe(
      tap( estaAutenticado => {
        // Si no está autenticado
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login')
        }
      })
    ) // Retorna falso o true
  }
  
}
