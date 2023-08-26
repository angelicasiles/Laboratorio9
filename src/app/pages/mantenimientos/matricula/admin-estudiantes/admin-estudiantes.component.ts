import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { EstudianteService } from 'src/app/shared/services/estudiante.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-estudiantes',
  templateUrl: './admin-estudiantes.component.html',
  styleUrls: ['./admin-estudiantes.component.scss']
})
export class AdminEstudiantesComponent {
  displayedColumns: string[] = [
    'IdEstudiante',
    'Nombre',
    'Apellido1',
    'Apellido2',
    'FechaNah',
    'Genero',
    'acciones'
  ];

  dataSource = new MatTableDataSource();

  constructor(
    private srvEstudiantes: EstudianteService,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
    private dialogRef: MatDialogRef<AdminEstudiantesComponent>
  ) {}
  ngOnInit() {
    this.cargarlista()
  }

  cargarlista(){
    this.srvEstudiantes.getAll().subscribe(
      (datos) => {

        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error("BASE DE DATOS VACIA");
        setTimeout(() => {
          this.mensajeria.clear(); 
        }, 2000);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  Obtener(data: any): void {
    this.dialogRef.close(data);
  }


  

}
