import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EstudianteForm } from 'src/app/shared/formsModels/estudianteForms';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { EstudianteService } from 'src/app/shared/services/estudiante.service';
import { AdminEstudiantesComponent } from './admin-estudiantes/admin-estudiantes.component';
import { MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';
import { Cursos } from 'src/app/shared/models/cursos';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss'],
})
export class MatriculaComponent {
  selectedStudent: Estudiante;
  seleccionarcursos: any[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'IdCurso',
    'NombreCurso',
    'Creditos',
    'acciones',
  ];
  seleccionado = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  CargarListaCursos() {
    try {
      this.dataSource.data = this.seleccionarcursos;
    } catch (error: any) {
      this.mensajeria.error(error);
    }
  }

  constructor(
    public estudianteform: EstudianteForm,
    private srvEstudiante: EstudianteService,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
    private srvCursos: CursosService
  ) {}

  abrirDialog(estudiante?: Estudiante): void {
    const dialogOpen = this.dialog.open(AdminEstudiantesComponent, {
      width: '800px',
      height: '800px',
      data: { estudiante },
    });

    dialogOpen.afterClosed().subscribe((estudiante: any) => {
      if (estudiante) {
        this.selectedStudent = estudiante;
        this.mensajeria.success('Seleccionado correctamente');
        setTimeout(() => {
          this.mensajeria.clear();
        }, 2000);
        this.seleccionado = true;
        this.cargarDatosForm();
      }
    });
  }
  cargarDatosForm() {
    const {
      IdEstudiante,
      Nombre,
      Apellido1,
      Apellido2,
      FechaNah,
      Genero
    } = this.selectedStudent;
  
    const formattedDate = formatDate(FechaNah, 'yyyy-MM-dd', 'en');
  
    this.estudianteform.baseForm.patchValue({
      IdEstudiante,
      Nombre,
      Apellido1,
      Apellido2,
      FechaNah: formattedDate,
      Genero,
      Estado: true,
    });
  }
  
  abrircursos(cursos?: Cursos) {
    const dialogClosed = this.dialog.open(AdminCursosComponent, {
      width: '800px',
      height: '800px',
      data: { cursos },
    });

    dialogClosed.afterClosed().subscribe((cursos: Cursos) => {
      if (cursos) {
        let cursoExistente = this.seleccionarcursos.find(
          (curso) => curso.IdCurso === cursos.IdCurso
        );
        if (!cursoExistente) {
          this.seleccionarcursos.push(cursos);
          this.mensajeria.success('Agregado correctamente');
          setTimeout(() => {
            this.mensajeria.clear();
          }, 2000);
          this.CargarListaCursos();
        } else {
          this.mensajeria.error('NO PUEDES SELECCIONAR EL MISMO CURSO');
          setTimeout(() => {
            this.mensajeria.clear();
          }, 2000);
        }
      }
    });
  }


  guardar() {
    if (!this.selectedStudent) {
      this.mostrarMensajeError('DEBES DE INDICAR EL ESTUDIANTE');
    } else if (this.seleccionarcursos.length === 0) {
      this.mostrarMensajeError('SE DEBE DE MATRICULAR AL MENOS UN CURSO');
    } else {
      try {
        const estudianteGuardar = {
          IdEstudiante: this.selectedStudent.IdEstudiante,
          cursos: this.seleccionarcursos.map(curso => ({ IdCurso: curso.IdCurso }))
        };
  
        this.srvEstudiante.guardarEstudianteConCursos(estudianteGuardar).subscribe(
          () => {
            this.mensajeria.success('ASIGNACIÓN EXITOSA');
            this.clear();
            this.CargarListaCursos();
          },
          error => {
            this.mensajeria.error(error.error.mensaje);
          }
        );
      } catch (error) {
        this.mostrarMensajeError('Error al Guardar, inténtelo de nuevo');
      }
    }
  }
  
  private clear() {
    this.estudianteform.baseForm.patchValue({
      IdEstudiante: 0,
      Nombre: '',
      Apellido1: '',
      Apellido2: '',
      FechaNah: '',
      Genero: '',
      Estado: true,
    });
    this.seleccionado = false;
    this.seleccionarcursos = [];
  }
  
  private mostrarMensajeError(mensaje: string) {
    this.mensajeria.error(mensaje, 'error');
  }
}
  