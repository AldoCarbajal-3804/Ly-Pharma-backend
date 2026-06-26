import { Router } from "express"
import { MuestraController } from "../../controller/dashboard/MuestraController"
import { authenticate } from "../../middleware/authenticate"
import { authorize } from "../../middleware/authorize"

export const muestraRouter = Router()

muestraRouter.get("/", authenticate, authorize("Admin", "Empleado"), MuestraController.index)
