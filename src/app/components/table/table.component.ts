import { Component, Input } from '@angular/core';
import { Materias } from 'src/app/models/materias.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() materias: Materias[] = [];
}
