import { Router } from 'express';
import producto from './productos';
import auth from './auth';
import usuarios from './usuarios';
import factura from './factura';
import { checkjwt } from '../middleware/jwt';
import categorias from './categorias';
import estudiante from './estudiante';
import matricula from './matricula';
import curso from './curso';


const routes = Router();

routes.use('/productos', producto);
routes.use('/auth', auth);
routes.use('/usuarios', usuarios);
routes.use('/factura', factura);
routes.use('/categorias', categorias);
routes.use('/Estudiante', estudiante);
routes.use('/Matriculas', matricula);
routes.use('/Cursos', curso);
export default routes;
