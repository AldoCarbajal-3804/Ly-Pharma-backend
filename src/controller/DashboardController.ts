import type { Request, Response, NextFunction } from "express"
import { DashboardService } from "../services/DashboardService"

const service = new DashboardService()

export class DashboardController {

  static async getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = res.locals.user
      const idEmpleado = user.nombre_rol === "Admin" ? undefined : user.id_empleado
      const data = await service.getDashboard(idEmpleado)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }
}
