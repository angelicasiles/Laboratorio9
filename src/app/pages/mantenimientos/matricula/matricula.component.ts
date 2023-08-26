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
  selectedcursos: any[] = [];
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
      this.dataSource.data = this.selectedcursos;
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
    this.estudianteform.baseForm.patchValue({
      IdEstudiante: this.selectedStudent.IdEstudiante,
      Nombre: this.selectedStudent.Nombre,
      Apellido1: this.selectedStudent.Apellido1,
      Apellido2: this.selectedStudent.Apellido2,
      FechaNah: formatDate(this.selectedStudent.FechaNah, 'yyyy-MM-dd', 'en'),
      Genero: this.selectedStudent.Genero,
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
        let cursoExistente = this.selectedcursos.find(
          (curso) => curso.IdCurso === cursos.IdCurso
        );
        if (!cursoExistente) {
          this.selectedcursos.push(cursos);
          this.mensajeria.success('Agregado correctamente');
          setTimeout(() => {
            this.mensajeria.clear();
          }, 2000);
          this.CargarListaCursos();
        } else {
          this.mensajeria.error('El curso ya está seleccionado.');
          setTimeout(() => {
            this.mensajeria.clear();
          }, 2000);
        }
      }
    });
  }

  EliminarCurso(idCurso: number) {
    try {
      this.selectedcursos = this.selectedcursos.filter(
        (curso) => curso.IdCurso !== idCurso
      );
      this.mensajeria.success('Eliminado correctamente');
      setTimeout(() => {
        this.mensajeria.clear();
      }, 2000);
      this.CargarListaCursos();
    } catch (error) {
      this.mensajeria.error('Error al eliminar, intentelo de nuevo');
      setTimeout(() => {
        this.mensajeria.clear();
      }, 2000);
    }
  }

  guardar() {
    if (!this.selectedStudent) {
      this.mensajeria.error('Indique el estudiante');
      setTimeout(() => {
        this.mensajeria.clear();
      }, 2000);
    } else if (this.selectedcursos.length === 0) {
      this.mensajeria.error('Indique al menos 1 curso');
      setTimeout(() => {
        this.mensajeria.clear();
      }, 2000);
    } else {
     try {
      const estudianteGuardar = {
        IdEstudiante: this.selectedStudent.IdEstudiante,
        cursos: this.selectedcursos.map(curso => ({ IdCurso: curso.IdCurso }))
      };
      
        this.srvEstudiante.guardarEstudianteConCursos(estudianteGuardar).subscribe(
          (response) => {
            const fecha = new Date();
            this.mensajeria.success('Cursos asignados exitosamente');
            this.estudianteform.baseForm.patchValue({
              IdEstudiante: 0,
              Nombre: "",
              Apellido1: "",
              Apellido2: "",
              FechaNah: fecha,
              Genero: "",
              Estado: true,
            })
            this.seleccionado = false
          this.selectedcursos = [];
           this.CargarListaCursos();
          },
          (error) => {
            this.mensajeria.error(error.error.mensaje);
          }
        ); 
     } catch (error) {
      this.mensajeria.error('Error al Guadar, intentelo de nuevo');
      setTimeout(() => {
        this.mensajeria.clear();
      }, 2000);
     }
    }
  }
}
