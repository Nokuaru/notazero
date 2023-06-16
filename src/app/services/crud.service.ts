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
  private userId: string = sessionStorage.getItem('userSub') || '';
  private REST_API: string = `https://ht9pf12136.execute-api.us-east-1.amazonaws.com/items/${this.userId}/materias`;
  private REST_API_CRUD: string =
    'https://ht9pf12136.execute-api.us-east-1.amazonaws.com/items';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getMaterias(): Observable<any> {
    return this.httpClient.get(this.REST_API, { headers: this.httpHeaders });
  }

  getMateria(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.REST_API_CRUD}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  createMateria(data: Materias): Observable<any> {
    return this.httpClient
      .put(this.REST_API_CRUD, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  updateMateria(id: any, data: any): Observable<any> {
    //ToDo: Ver como cambiar la dirección de API para el PUT
    return this.httpClient
      .put(`${this.REST_API_CRUD}/${id}`, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteMateria(id: any): Observable<any> {
    //ToDo: Ver como cambar la rireccion de API para el DELETE
    return this.httpClient
      .delete(`${this.REST_API_CRUD}/${id}`, { headers: this.httpHeaders })
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
