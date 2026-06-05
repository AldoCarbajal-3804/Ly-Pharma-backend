import{ Request, Response} from "express"
import {TipoService} from "../services/TipoService"

export class TipoController {
    static async list(_req: Request, res: Response): Promise<void> {
        const service = new TipoService()
        const tipos = await service.list()
        res.json(tipos)
    }
}