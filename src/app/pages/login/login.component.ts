import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User | undefined;

  alertMessage: string = '';
  showAlert: boolean = false;
  forgotPassword: boolean = false;
  isForgotPassword: boolean = false;
  newPassword: string = '';
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.user = {} as User;
  }

  signInWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService
        .signIn(this.user)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Ingrese un email y/o una contraseña valida');
    }
  }

  showLoginClicked() {
    this.forgotPassword = false;
  }

  forgotPassWordClicked() {
    this.forgotPassword = true;
    this.isForgotPassword = true;
    if (this.user && this.user.email) {
      this.cognitoService
        .forgotPassword(this.user)
        .then(() => {
          this.isForgotPassword = true;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert(
        'Para recuperar su contraseña ingrese en el campo Email un mail valido y vuelva a tocar olvido su contraseña'
      );
    }
  }

  newPasswordSubmit() {
    if (this.user && this.user.code && this.newPassword) {
      this.cognitoService
        .forgotPasswordSubmit(this.user, this.newPassword.trim())
        .then(() => {
          this.displayAlert('Contraseña actualizada');
          this.isForgotPassword = false;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Por favor ingrese bien los datos');
    }
  }
  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }

  //constructor(private router: Router) {}
  //ngOnInit(): void {
  //const url = window.location.href;
  //const token = this.extractTokenFromUrl(url);
  //if (token) {
  //  sessionStorage.setItem('token', token);
  //  this.router.navigate(['/home']);
}
//}

//private extractTokenFromUrl(url: string): string | null {
// const tokenRegex = /id_token=([^&]+)/;
// const match = url.match(tokenRegex);

// if (match && match.length > 1) {
//   return match[1];
// }

// return null;
//}
//}
