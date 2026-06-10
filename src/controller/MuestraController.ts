import type { Request, Response } from "express"
import { MuestraService } from "../services/MuestraService"

const service = new MuestraService()

export class MuestraController {

    static async index(_req: Request, res: Response): Promise<void> {
        try {
            const data = await service.getEmployeeSummary(res.locals.user.id_empleado)
            res.json(data)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            res.status(500).json({ message })
        }
    }
}
