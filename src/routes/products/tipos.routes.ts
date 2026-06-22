import { Router } from "express"
import { TipoController } from "../../controller/products/TipoController"
import { authenticate } from "../../middleware/authenticate"
import { authorize } from "../../middleware/authorize"

export const tiposRouter = Router()

tiposRouter.get("/", authenticate, authorize("Admin", "Empleado"), TipoController.list)
