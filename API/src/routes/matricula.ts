import { Router } from "express";
import MatriculaController from "../controller/MatriculaController";


const routes = Router();

routes.get("" ,MatriculaController.getAll);


export default routes;