import { Router } from "express";
import { TipoController } from "../controller/TipoController";

export const tiposRouter = Router();
tiposRouter.get("/", TipoController.list);