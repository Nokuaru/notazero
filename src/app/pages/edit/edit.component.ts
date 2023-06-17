import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Materias } from 'src/app/models/materias.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: any;
  userId: string;
  materia: Materias | undefined;

  constructor(
    private crudService: CrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.crudService.getMateria(this.id).subscribe((res) => {
      this.materia = {
        userId: this.id,
        materiaId: res.materiaId,
        materia: res.materia,
        anio: res.anio,
        cuatrimestre: res.cuatrimestre,
        estado: res.estado,
        horario: res.horario,
        fechaPrimerParcial: res.fechaPrimerParcial,
        notaPrimerParcial: res.notaPrimerParcial,
        fechaSegundoParcial: res.fechaSegundoParcial,
        notaSegundoParcial: res.notaSegundoParcial,
        fechaRecuperatorio: res.fechaRecuperatorio,
        notaRecuperatorio: res.notaRecuperatorio,
        fechaFinal: res.fechaFinal,
        notaFinal: res.notaFinal,
        observaciones: res.observaciones,
      };
    });
  }

  onSubmit(materia: Materias) {
    this.crudService.updateMateria(this.id, materia).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
