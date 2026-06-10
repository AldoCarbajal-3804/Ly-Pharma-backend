import { Router } from "express"
import { InicioController } from "../controller/InicioController"
import { authenticate } from "../middleware/authenticate"
import { authorize } from "../middleware/authorize"

export const inicioRouter = Router()

inicioRouter.get("/", authenticate, authorize("Admin", "Empleado"), InicioController.getInicio)
