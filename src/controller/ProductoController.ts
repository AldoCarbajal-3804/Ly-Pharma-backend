import type {Request, Response} from "express"
import {ProductService} from "../services/ProductService"

const service = new ProductService()

export class ProductoController {

    static async list(_req: Request, res: Response): Promise<void> {
        const productos = await service.list()
        res.json(productos)
    }

    static async create(req: Request, res: Response): Promise<void> {
        const producto = await service.create(req.body)
        res.status(201).json(producto)
    }

    static async delete(req: Request, res: Response): Promise<void> {
        const {id_producto} = req.params
        await service.delete(Number(id_producto))
        res.status(204).send()
    }


    static async update(req: Request, res: Response): Promise<void> {
        const {id_producto} = req.params
        const producto = await service.update(Number(id_producto), req.body)
        res.json(producto)
    }

}

