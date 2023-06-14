import { Component, OnInit } from '@angular/core';
import { Materias } from 'src/app/models/materias.model';
import { User } from 'src/app/models/user.model';
import { CognitoService } from 'src/app/services/cognito.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  materias: Materias[] = [];
  usuario: User[] = [];
  userName = sessionStorage.getItem('userName');
  isLoading: boolean = true;

  constructor(
    private crudeService: CrudService,
    private cognitoService: CognitoService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.crudeService.getMaterias().subscribe((res: any) => {
      this.usuario = [res.user];
      this.materias = res.materias;
      this.isLoading = false;
    });
  }
}
