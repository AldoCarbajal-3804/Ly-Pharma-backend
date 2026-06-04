import { Router } from "express"
import { ClienteController } from "../controller/ClienteController"

export const clientesRouter = Router()

clientesRouter.get("/", ClienteController.list)
clientesRouter.post("/", ClienteController.create)
