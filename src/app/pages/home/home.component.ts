import { Component, OnInit } from '@angular/core';
import { Materias } from 'src/app/models/materias.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  materias: Materias[] = [];

  constructor(private crudeService: CrudService) {}

  ngOnInit(): void {
    this.crudeService.getMaterias().subscribe((res: Materias[]) => {
      this.materias = res;
      console.log(this.materias);
    });
  }
}
