import type { Request, Response, NextFunction } from "express"
import { ClienteService } from "../../services/ventas/ClienteService"
import { ZodError } from "zod"

const service = new ClienteService()

export class ClienteController {
    static async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientes = await service.list()
            res.json(clientes)
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const clientes = await service.create(req.body)
            res.status(201).json(clientes)
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            next(error)
        }
    }
}
