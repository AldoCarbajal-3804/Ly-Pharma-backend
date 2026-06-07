import { Router } from "express"
import { CategoriaController } from "../controller/CategoriaController"
import { authenticate } from "../middleware/authenticate"
import { authorize } from "../middleware/authorize"

export const categoriaRouter = Router()

categoriaRouter.get("/", authenticate, authorize("Admin", "Empleado"), CategoriaController.list)
