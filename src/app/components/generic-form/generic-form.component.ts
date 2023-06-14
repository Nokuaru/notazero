import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.css'],
})
export class GenericFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService,
    private router: Router
  ) {}

  formMaterias: FormGroup;
  @Input()
  modelMaterias: User;
  @Output()
  submitValues: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit(): void {
    this.formMaterias = this.formBuilder.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
    if (this.modelMaterias !== undefined) {
      this.formMaterias.patchValue(this.modelMaterias);
    }
  }

  onSubmit(): void {
    this.submitValues.emit(this.formMaterias.value);
  }
}
