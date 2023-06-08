import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CognitoService {
  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
  }

  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        email: user.email,
        given_name: user.givenName,
        family_name: user.familyName,
      },
    });
  }
  public confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  // este metodo retorna la informacion del usuario si hay algun usuario logea si es
  // valido el email y contraseña
  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password);
  }

  public signOut(): Promise<any> {
    return Auth.signOut();
  }

  // este metodo envia un nuevo codigo al email del usuario
  public forgotPassword(user: User): Promise<any> {
    return Auth.forgotPassword(user.email);
  }

  // este metodo crea una nueva contraseña lo envia al mail
  public forgotPasswordSubmit(user: User, newPassword: string): Promise<any> {
    return Auth.forgotPasswordSubmit(user.email, user.code, newPassword);
  }
}
