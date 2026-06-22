import { Router } from "express"
import { ClienteController } from "../../controller/ventas/ClienteController"
import { authenticate } from "../../middleware/authenticate"
import { authorize } from "../../middleware/authorize"

export const clientesRouter = Router()

clientesRouter.get("/", authenticate, authorize("Admin", "Empleado"), ClienteController.list)
clientesRouter.post("/", authenticate, authorize("Admin", "Empleado"), ClienteController.create)
