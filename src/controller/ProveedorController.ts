import {Request, Response} from "express"
import {ProveedorService} from "../services/ProveedorService"

export class ProveedorController {
    static async list(_req: Request, res: Response): Promise<void> {
        const service = new ProveedorService()
        const proveedores = await service.list()
        res.json(proveedores)
    }
}