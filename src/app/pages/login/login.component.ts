import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = window.location.href;
    const token = this.extractTokenFromUrl(url);

    if (token) {
      sessionStorage.setItem('token', token);
      this.router.navigate(['/home']);
    }
  }

  private extractTokenFromUrl(url: string): string | null {
    const tokenRegex = /id_token=([^&]+)/;
    const match = url.match(tokenRegex);

    if (match && match.length > 1) {
      return match[1];
    }

    return null;
  }
}
