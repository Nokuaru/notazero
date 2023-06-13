import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router, private cognitoService: CognitoService) {}
  signOut() {
    sessionStorage.removeItem('userSub'); // Borrar el valor del sessionStorage
    this.cognitoService.signOut();
  }
}
