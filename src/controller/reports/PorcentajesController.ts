import type { Request, Response, NextFunction } from "express"
import { PorcentajesService } from "../../services/reports/PorcentajesService"

const service = new PorcentajesService()

export class PorcentajesController {

    static async productos(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await service.getPorcentajeProductos()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async ventas(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await service.getPorcentajeVentas()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
