import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { MaterialModule } from 'src/app/material.module';
import { AdminProductosComponent } from './productos/admin-productos/admin-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatriculaComponent } from './matricula/matricula.component';
import { AdminCursosComponent } from './matricula/admin-cursos/admin-cursos.component';
import { AdminEstudiantesComponent } from './matricula/admin-estudiantes/admin-estudiantes.component';

@NgModule({
  declarations: [
    MantenimientosComponent,
    ClientesComponent,
    ProductosComponent,
    AdminProductosComponent,
    MatriculaComponent,
    AdminCursosComponent,
    AdminEstudiantesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MantenimientosRoutingModule,
    MaterialModule,
  ],
})
export class MantenimientosModule {}
