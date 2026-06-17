import type { Request, Response, NextFunction } from "express"
import { SesionService } from "../services/SesionService"

const service = new SesionService()

export class SesionController {

    static async listRecent(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sesiones = await service.listRecent(res.locals.user.id_usuario)
            res.json(sesiones)
        } catch (error) {
            next(error)
        }
    }
}
