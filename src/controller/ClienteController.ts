import type { Request, Response } from "express"
import { ClienteService } from "../services/ClienteService"

const service = new ClienteService()

export class ClienteController {
    static async list(_req: Request, res: Response): Promise<void> {
        const clientes = await service.list()
        res.json(clientes)
    }

    static async create(req: Request, res: Response): Promise<void> {
        const clientes = await service.create(req.body)
        res.status(201).json(clientes)
    }
}
