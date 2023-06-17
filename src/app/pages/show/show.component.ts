import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getMateria(this.id).subscribe((res: any) => {
      this.materia = res;
    });
  }

  delete() {
    if (confirm('¿Estás seguro de que queres eliminar esta materia?')) {
      this.crudService.deleteMateria(this.id).subscribe(
        (res: any) => {
          // Redirigir al usuario a la página de inicio
          this.router.navigate(['/home']);
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
}
