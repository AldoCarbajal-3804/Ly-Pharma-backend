import { Router } from "express"
import { GananciasController } from "../../controller/reports/GananciasController"
import { RankingController } from "../../controller/reports/RankingController"
import { ProductosMasVendidosController } from "../../controller/reports/ProductosMasVendidosController"
import { PorcentajesController } from "../../controller/reports/PorcentajesController"
import { authenticate } from "../../middleware/authenticate"
import { authorize } from "../../middleware/authorize"

export const reportsRouter = Router()

reportsRouter.get("/ganancias", authenticate, authorize("Admin", "Empleado"), GananciasController.index)
reportsRouter.get("/ranking-empleados", authenticate, authorize("Admin"), RankingController.index)
reportsRouter.get("/productos-mas-vendidos", authenticate, authorize("Admin", "Empleado"), ProductosMasVendidosController.index)
reportsRouter.get("/porcentaje-productos", authenticate, authorize("Admin"), PorcentajesController.productos)
reportsRouter.get("/porcentaje-ventas", authenticate, authorize("Admin", "Empleado"), PorcentajesController.ventas)
