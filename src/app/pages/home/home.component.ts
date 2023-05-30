import { Component, OnInit } from '@angular/core';
import { Materias } from 'src/app/models/materias.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  materias: Materias[] = [];
  usuario: Usuario[] = [];

  constructor(private crudeService: CrudService) {}

  ngOnInit(): void {
    this.crudeService.getMaterias().subscribe((res: any) => {
      this.usuario = [res.user];
      console.log(this.usuario);
      this.materias = res.materias;
      console.log(this.materias);
    });
  }
}
