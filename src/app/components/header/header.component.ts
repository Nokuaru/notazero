import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.cognitoService.getUser().then(() => {
      this.userName = sessionStorage.getItem('userName');
    });
  }

  signOut() {
    this.cognitoService.signOut().then(() => {
      sessionStorage.clear();
      this.router.navigate(['/']);
    });
  }
}
