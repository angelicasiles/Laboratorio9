import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  constructor(private http: HttpClient) {}
  

  getAll(): Observable<Estudiante[]> {
    return this.http
      .get<Estudiante[]>('http://localhost:3000/Estudiante')
      .pipe(catchError(this.handlerError));
  }

  guardarEstudianteConCursos(data: any): Observable<any>{
    return this.http
    .patch<Estudiante>('http://localhost:3000/Estudiante', data)
    .pipe()
  }


  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al adminstrador.';
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }
    return throwError(() => new Error(mensaje));
  }
}
