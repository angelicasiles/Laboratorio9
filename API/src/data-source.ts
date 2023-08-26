import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Producto } from './entity/Producto';
import { Usuarios } from './entity/Usuario';
import { Persona } from './entity/Persona';
import { Cliente } from './entity/Cliente';
import { TipoCliente } from './entity/TipoCliente';
import { Factura } from './entity/Factura';
import { DetalleFactura } from './entity/DetalleFactura';
import { CategoriaProducto } from './entity/CategoriaProducto';
import { Estudiante } from './entity/Estudiante';
import { Cursos } from './entity/Curso';
import { Matricula } from './entity/Matricula';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'pruebautn',
  synchronize: true,
  logging: false,
  entities: [
    Producto,
    Usuarios,
    Persona,
    Cliente,
    TipoCliente,
    Factura,
    DetalleFactura,
    Estudiante,
    Cursos,
    Matricula,
    CategoriaProducto,
    
  ],
  migrations: [],
  subscribers: [],
});
