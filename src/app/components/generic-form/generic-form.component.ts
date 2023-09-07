import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Materias } from 'src/app/models/materias.model';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  userId = sessionStorage.getItem('userSub');
  formMaterias: FormGroup;
  @Input()
  modelMaterias: Materias;
  @Output()
  submitValues: EventEmitter<Materias> = new EventEmitter<Materias>();
  formValid = false;

  ngOnInit(): void {
    this.formMaterias = this.formBuilder.group({
      userId: [this.userId, Validators.required],
      materia: ['', Validators.required],
      anio: ['', Validators.required],
      cuatrimestre: ['', Validators.required],
      estado: ['', Validators.required],
      horario: [''],
      fechaPrimerParcial: [''],
      notaPrimerParcial: [''],
      fechaSegundoParcial: [''],
      notaSegundoParcial: [''],
      fechaRecuperatorio: [''],
      notaRecuperatorio: [''],
      fechaFinal: [''],
      notaFinal: [''],
      observaciones: [''],
    });
    if (this.modelMaterias !== undefined) {
      this.formMaterias.patchValue(this.modelMaterias);
    }

    this.formMaterias.valueChanges.subscribe(() => {
      this.formValid = this.formMaterias.valid;
    });
  }

  onSubmit(): void {
    if (this.formMaterias.valid) {
      this.submitValues.emit(this.formMaterias.value);
    }
  }
}
