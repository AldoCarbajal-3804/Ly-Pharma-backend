import type { Request, Response, NextFunction } from "express"
import { ProductosMasVendidosService } from "../../services/reports/ProductosMasVendidosService"

const service = new ProductosMasVendidosService()

export class ProductosMasVendidosController {

    static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const limite = Number(req.query.limite) || 10
            const data = await service.getProductosMasVendidos(limite)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
