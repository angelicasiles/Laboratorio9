import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { Estudiante } from '../entity/Estudiante';
import { Matricula } from '../entity/Matricula';

class EstudianteController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const GeneralRepo = AppDataSource.getRepository(Estudiante);

      const listaEstudiante= await GeneralRepo.find({
        where: {    Estado: true }
      });

      if (listaEstudiante.length == 0) {
        return resp.status(404).json({ mensaje: 'SIN RESULTADOS' });
      }
      return resp.status(200).json(listaEstudiante);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const IdEstudiante = parseInt(req.params['id']);

      if (!IdEstudiante) {
        return resp.status(404).json({ mensaje: 'DEBES DE INDICAR EL ID' });
      }

      const GeneralRepo = AppDataSource.getRepository(Estudiante);

      let Est;
      try {
        Est = await GeneralRepo.findOneOrFail({
          where: { IdEstudiante, Estado: true }
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'EN LA BASE DE DATOS NO SE ENCUENTRA ESE REGISTRO' });
      }

      return resp.status(200).json(Est);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      const { IdEstudiante, cursos } = req.body;
    
      const generalRepo = AppDataSource.getRepository(Estudiante);
      const estudiante = await generalRepo.findOne({
        where: { IdEstudiante },
        relations: { cursos: true },
      });
    
      if (!estudiante) {
        return resp.status(400).json({
          mensaje: 'ESTUDIANTE NO ENCONTRADO',
        });
      }
    
      const matriculasFiltradas = cursos.map((curs) => {
        const matricula = estudiante.cursos.find((m) => m.IdCurso === curs.IdCurso);
    
        if (!matricula) {
          const newMatricula = new Matricula();
          newMatricula.IdEstudiante = IdEstudiante;
          newMatricula.IdCurso = curs.IdCurso;
          return newMatricula;
        }
        return null; // Retorna null para eliminar elementos undefined del array
      }).filter((matricula) => matricula !== null); // Filtra los elementos null
    
      estudiante.cursos.push(...matriculasFiltradas);
    
      try {
        await generalRepo.save(estudiante);
        return resp.status(201).json({
          mensaje: 'AGREGADO CORRECTAMENTE',
        });
      } catch (error) {
        return resp.status(400).json({
          mensaje: 'ERROR',
        });
      }
    } catch (error) {
      return resp.status(400).json({
        mensaje: error.mensaje,
      });
    }
  } 
}   

export default EstudianteController;