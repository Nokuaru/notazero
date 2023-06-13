import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cognitoService: CognitoService) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthenticated = await this.cognitoService.isAuthenticated();
    const url = state.url;

    if (url === '/' || url === '/signup') {
      // Si la URL es '/' o '/signup'
      if (isAuthenticated) {
        // Si está autenticado, redirigir a '/home'
        this.router.navigate(['/home']);
        return false;
      } else {
        // Si no está autenticado, permitir navegación a '/signup'
        return true;
      }
    } else {
      // Si la URL es distinta a '/' y '/signup'
      if (isAuthenticated) {
        // Si está autenticado, permitir navegación a todas las páginas
        return true;
      } else {
        // Si no está autenticado, redirigir a '/'
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
