import { Router } from "express"
import { SesionController } from "../controller/SesionController"
import { authenticate } from "../middleware/authenticate"
import { authorize } from "../middleware/authorize"

export const sesionesRouter = Router()

sesionesRouter.get("/", authenticate, authorize("Admin", "Empleado"), SesionController.listRecent)
