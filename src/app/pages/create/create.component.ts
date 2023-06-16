import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Materias } from 'src/app/models/materias.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(private router: Router, private crudService: CrudService) {}

  onSubmit(materias: Materias) {
    this.crudService.createMateria(materias).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
