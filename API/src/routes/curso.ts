import { Router } from "express";
import CursosController from "../controller/CursosController";
const routes = Router();

routes.get( "" ,CursosController.getAll);
routes.get("/:id", CursosController.getById);
export default routes;