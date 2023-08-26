import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/* La clase EstudianteForm es una clase de TypeScript que representa un formulario para crear un
estudiante con varios campos obligatorios. */
@Injectable({ providedIn: 'root' })
export class EstudianteForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      IdEstudiante: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Apellido1: ['', [Validators.required]],
      Apellido2: ['', [Validators.required]],
      FechaNah:[formatDate(Date.now(), 'yyyy-MM-dd', 'en'),[Validators.required],],
      Genero: ['', [Validators.required]],
      Estado: [true],
    });
  }
}
