import { Router } from "express"
import { VentaController } from "../../controller/ventas/VentaController"
import { authenticate } from "../../middleware/authenticate"
import { authorize } from "../../middleware/authorize"

export const ventasRouter = Router()

ventasRouter.post("/", authenticate, authorize("Empleado"), VentaController.create)
ventasRouter.get("/", authenticate, authorize("Admin", "Empleado"), VentaController.list)
ventasRouter.get("/:id_venta", authenticate, authorize("Admin"), VentaController.getById)
