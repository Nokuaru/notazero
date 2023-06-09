import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User | undefined;
  isConfirm: boolean = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.user = {} as User;
    this.isConfirm = false;
  }

  public signUpWithCognito() {
    if (this.user && this.user.email && this.user.password) {
      this.cognitoService
        .signUp(this.user)
        .then(() => {
          this.isConfirm = true;
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Completa todos los campos para registrarte');
    }
  }

  public confirmSignUp() {
    if (this.user) {
      this.cognitoService
        .confirmSignUp(this.user)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch((error: any) => {
          this.displayAlert(error.message);
        });
    } else {
      this.displayAlert('Falta información de usuario');
    }
  }

  private displayAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
  }
}
