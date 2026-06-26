import type { Request, Response, NextFunction } from "express"
import { GananciasService } from "../../services/reports/GananciasService"

const service = new GananciasService()

export class GananciasController {

    static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre_rol, id_empleado } = res.locals.user
            const periodo = (req.query.periodo as string) ?? "dia"

            const data = nombre_rol === "Admin"
                ? await service.getGanancias(periodo)
                : await service.getGanancias(periodo, id_empleado)

            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
