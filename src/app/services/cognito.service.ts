import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  constructor() {
    // Configuración de Amplify
    Amplify.configure({
      Auth: environment.cognito,
    });
  }

  // Registro de usuario
  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        name: user.name,
      },
    });
  }

  // Confirmación de registro
  public confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  // Obtener información del usuario actualmente logueado
  public async getUser(): Promise<string> {
    const userInfo = await Auth.currentUserInfo();
    const sub = userInfo.attributes.sub;
    sessionStorage.setItem('userSub', sub); // Guardar el sub en sessionStorage
    return sub;
  }

  // Verificar si hay un usuario autenticado
  public isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      Auth.currentAuthenticatedUser()
        .then(() => {
          resolve(true); // Usuario autenticado
        })
        .catch(() => {
          resolve(false); // Usuario no autenticado
        });
    });
  }

  // Inicio de sesión
  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  // Cierre de sesión
  public signOut(): Promise<any> {
    return Auth.signOut();
  }

  // Recuperación de contraseña (enviar código al email del usuario)
  public forgotPassword(user: User): Promise<any> {
    return Auth.forgotPassword(user.email);
  }

  // Envío de nueva contraseña desde el front para recuperar contraseña olvidada
  public forgotPasswordSubmit(user: User, newPassword: string): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, newPassword);
  }
}
