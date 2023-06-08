import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');
    if (token) {
      return true; // El token está presente, permite la navegación
    } else {
      window.location.href =
        'https://authnotazero.auth.us-east-1.amazoncognito.com/login?client_id=4i1jp7j7jkhscvmco4i2bnkkhf&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F';
      return false; // Redirige a la URL externa y bloquea la navegación
    }
  }
}
