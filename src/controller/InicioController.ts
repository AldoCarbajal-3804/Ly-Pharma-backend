import type { Request, Response, NextFunction } from "express"
import { InicioService } from "../services/InicioService"

const service = new InicioService()

export class InicioController {

    static async getInicio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = res.locals.user
            const idEmpleado = user.nombre_rol === "Admin" ? undefined : user.id_empleado
            const data = await service.getInicio(idEmpleado)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
