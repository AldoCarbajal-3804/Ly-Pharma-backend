import type { Request, Response, NextFunction } from "express"
import { SesionService } from "../../services/users/SesionService"

const service = new SesionService()

export class SesionController {

    static async listRecent(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre_rol, id_usuario } = res.locals.user
            const sesiones = nombre_rol === "Admin"
                ? await service.listRecent()
                : await service.listRecent(id_usuario)
            res.json(sesiones)
        } catch (error) {
            next(error)
        }
    }
}
