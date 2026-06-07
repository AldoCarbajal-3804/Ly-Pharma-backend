import { Router } from "express"
import { ProveedorController } from "../controller/ProveedorController"
import { authenticate } from "../middleware/authenticate"
import { authorize } from "../middleware/authorize"

export const proveedorRouter = Router()

proveedorRouter.get("/", authenticate, authorize("Admin", "Empleado"), ProveedorController.list)
proveedorRouter.post("/", authenticate, authorize("Admin"), (_req, res) => res.status(501).json({ message: "No implementado" }))
