import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CursosService } from 'src/app/shared/services/cursos.service';
@Component({
  selector: 'app-admin-cursos',
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['./admin-cursos.component.scss']
})
export class AdminCursosComponent {
  
  titulo = 'SELECCIONE EL CURSO';
  displayedColumns: string[] = [
    'IdCurso',
    'NombreCurso',
    'Creditos',
    'acciones'
  ];

  dataSource = new MatTableDataSource();

  constructor(
    private srvCursos: CursosService,
    public dialog: MatDialog,
    private mensajeria: ToastrService,
    private dialogRef: MatDialogRef<AdminCursosComponent>
  ) {}

  ngOnInit() {
    this.cargarlista()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarlista(){
    this.srvCursos.getAll().subscribe(
      (datos) => {
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error("No hay datos que mostrar");
        setTimeout(() => {
          this.mensajeria.clear(); 
        }, 1500);
      }
    );
  }


}
