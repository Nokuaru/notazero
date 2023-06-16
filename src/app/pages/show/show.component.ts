import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Materias } from 'src/app/models/materias.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent implements OnInit {
  id!: any;
  materia: Materias | undefined;
  constructor(
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getMateria(this.id).subscribe((res: any) => {
      this.materia = res;
    });
  }
}
