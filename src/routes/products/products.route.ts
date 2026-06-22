import { Router } from "express"
import { ProductoController } from "../../controller/products/ProductoController"
import { authenticate } from "../../middleware/authenticate"
import { authorize } from "../../middleware/authorize"

export const productosRouter = Router()

productosRouter.get("/", authenticate, authorize("Admin", "Empleado"), ProductoController.list)
productosRouter.get("/stock-bajo", authenticate, authorize("Admin", "Empleado"), ProductoController.listLowStock)
productosRouter.get("/por-vencer", authenticate, authorize("Admin", "Empleado"), ProductoController.listExpiring)
productosRouter.post("/", authenticate, authorize("Admin"), ProductoController.create)
productosRouter.delete("/:id_producto", authenticate, authorize("Admin"), ProductoController.delete)
productosRouter.put("/:id_producto", authenticate, authorize("Admin"), ProductoController.update)
