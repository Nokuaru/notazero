import { Injectable, Inject } from '@angular/core';
import { Materias } from '../models/materias.model';
import { environment } from 'src/environments/environment';

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
  private REST_API: string = `${environment.api.API_URL}/api/${this.userId}/subjects`;

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getMaterias(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(this.REST_API, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res.subjects || [];
        })
      );
  }

  getMateria(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.REST_API}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  createMateria(data: Materias): Observable<any> {
    return this.httpClient
      .put(this.REST_API, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  updateMateria(id: any, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteMateria(id: any): Observable<any> {
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
