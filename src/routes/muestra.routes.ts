import { Router } from "express"
import { MuestraController } from "../controller/MuestraController"
import { authenticate } from "../middleware/authenticate"

export const muestraRouter = Router()

muestraRouter.get("/", authenticate, MuestraController.index)
