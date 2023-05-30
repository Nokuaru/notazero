export interface Materias {
  _id: string;
  userId: string;
  materiaId: string;
  materia: string;
  anio: number;
  cuatrimestre: number;
  estado: string;
  horario: string;
  fechaPrimerParcial: string;
  notaPrimerParcial: number;
  fechaSegundoParcial: string;
  notaSegundoParcial: number;
  fechaRecuperatorio: string;
  notaRecuperatorio: number;
  fechaFinal: string;
  notaFinal: number;
  observaciones: string;
}
