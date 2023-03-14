import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { tap } from 'rxjs/operators';

// Servicios
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor (
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  // Va a cargar la ruta si la persona tiene acceso a esa ruta
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // TODO: Verificar si hay token
    return this.usuarioService.validarToken()
    .pipe(
      tap( estaAutenticado => {
        // Si no está autenticado
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login')
        }
      })
    )
  }
  
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
