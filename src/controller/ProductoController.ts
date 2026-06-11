import type { Request, Response, NextFunction } from "express"
import { ProductService } from "../services/ProductService"
import { ZodError } from "zod"
import type { ProductoFilters } from "../types/productos/filters"

const service = new ProductService()

export class ProductoController {

    static async list(req: Request, res: Response): Promise<void> {
        const filters: ProductoFilters = {}
        const q = req.query

        if (typeof q.categoria === "string") filters.categoria = q.categoria
        if (typeof q.tipo === "string") filters.tipo = q.tipo
        if (typeof q.proveedor === "string") filters.proveedor = q.proveedor

        const catId = Number(q.categoria_id)
        if (!Number.isNaN(catId)) filters.categoria_id = catId

        const tipId = Number(q.tipo_id)
        if (!Number.isNaN(tipId)) filters.tipo_id = tipId

        const provId = Number(q.proveedor_id)
        if (!Number.isNaN(provId)) filters.proveedor_id = provId

        if (q.stock === "asc" || q.stock === "desc") filters.stock = q.stock
        if (q.vencimiento === "asc" || q.vencimiento === "desc") filters.vencimiento = q.vencimiento

        const limit = Number(q.limit)
        if (!Number.isNaN(limit)) filters.limit = limit

        const offset = Number(q.offset)
        if (!Number.isNaN(offset)) filters.offset = offset

        const result = await service.list(filters)
        res.json(result)
    }

    static async listLowStock(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productos = await service.listLowStock()
            res.json(productos)
        } catch (error) {
            next(error)
        }
    }

    static async listExpiring(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const productos = await service.listExpiring()
            res.json(productos)
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const producto = await service.create(req.body)
            res.status(201).json(producto)
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_producto } = req.params
            await service.delete(Number(id_producto))
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_producto } = req.params
            const producto = await service.update(Number(id_producto), req.body)
            res.json(producto)
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            next(error)
        }
    }
}
