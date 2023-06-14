import { Injectable } from '@angular/core';
import { Materias } from '../models/materias.model';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private REST_API: string;
  private userId: string;
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.userId = sessionStorage.getItem('userSub') || '';
    console.log(this.userId);

    // Construir la URL de la API con el userId --> ${userId}
    this.REST_API = `https://ht9pf12136.execute-api.us-east-1.amazonaws.com/items/${this.userId}/materias`;
  }

  getMaterias(): Observable<any> {
    return this.httpClient.get(this.REST_API, { headers: this.httpHeaders });
  }

  getMateria(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.REST_API}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  createMateria(data: Materias): Observable<any> {
    //ToDo: Ver como cambiar la dirección de API para el PUT
    return this.httpClient
      .post(this.REST_API, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  updateMateria(id: any, data: any): Observable<any> {
    //ToDo: Ver como cambiar la dirección de API para el PUT
    return this.httpClient
      .put(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteMateria(id: any): Observable<any> {
    //ToDo: Ver como cambar la rireccion de API para el DELETE
    return this.httpClient
      .delete(`${this.REST_API}/${id}`, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(() => {
      errorMsg;
    });
  }
}
