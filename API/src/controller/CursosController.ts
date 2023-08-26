import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { Cursos } from '../entity/Curso';

class CursosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const GeneralRepo = AppDataSource.getRepository(Cursos);

      const cursos= await GeneralRepo.find({where:{Estado:true}});

      if (cursos.length == 0) {
        return resp.status(404).json({ mensaje: ' SIN RESULTADOS' });
      }
      return resp.status(200).json(cursos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {

  }
}

export default CursosController;