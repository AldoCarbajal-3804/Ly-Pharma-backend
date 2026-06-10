import { Router } from "express"
import { DashboardController } from "../controller/DashboardController"
import { authenticate } from "../middleware/authenticate"
import { authorize } from "../middleware/authorize"

export const dashboardRouter = Router()

dashboardRouter.get("/", authenticate, authorize("Admin", "Empleado"), DashboardController.getDashboard)
