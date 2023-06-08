import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
