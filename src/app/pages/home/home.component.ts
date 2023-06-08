import { Component, OnInit } from '@angular/core';
import { Materias } from 'src/app/models/materias.model';
import { User } from 'src/app/models/user.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  materias: Materias[] = [];
  usuario: User[] = [];

  constructor(private crudeService: CrudService) {}

  ngOnInit(): void {
    this.crudeService.getMaterias().subscribe((res: any) => {
      this.usuario = [res.user];
      this.materias = res.materias;
    });
  }
}
