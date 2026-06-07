import type { Request, Response } from "express"
import { ProductService } from "../services/ProductService"
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

    const productos = await service.list(filters)
    res.json(productos)
  }

  static async create(req: Request, res: Response): Promise<void> {
    const producto = await service.create(req.body)
    res.status(201).json(producto)
  }

  static async delete(req: Request, res: Response): Promise<void> {
    const { id_producto } = req.params
    await service.delete(Number(id_producto))
    res.status(204).send()
  }

  static async update(req: Request, res: Response): Promise<void> {
    const { id_producto } = req.params
    const producto = await service.update(Number(id_producto), req.body)
    res.json(producto)
  }
}
