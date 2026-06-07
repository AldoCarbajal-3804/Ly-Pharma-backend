import type { Request, Response, NextFunction } from "express"
import { VentaService } from "../services/VentaService"
import { ZodError } from "zod"

const service = new VentaService()

export class VentaController {

    static async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const idEmpleado = res.locals.user.id_empleado
            const venta = await service.create(req.body, idEmpleado)
            res.status(201).json(venta)
        } catch (error) {
            if (error instanceof ZodError) {
                next(error)
                return
            }
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            const status = message.startsWith("Stock insuficiente") || message.includes("no encontrado") ? 400 : 500
            res.status(status).json({ message })
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const idVenta = Number(req.params.id_venta)
            if (Number.isNaN(idVenta)) {
                res.status(400).json({ message: "ID de venta inválido" })
                return
            }
            const venta = await service.getById(idVenta)
            res.json(venta)
        } catch (error) {
            next(error)
        }
    }

    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const limit = Number(req.query.limit)
            const offset = Number(req.query.offset)
            const user = res.locals.user

            let filterEmpleado: number | undefined
            if (user.nombre_rol === "Admin") {
                const q = Number(req.query.id_empleado)
            if (!Number.isNaN(q)) filterEmpleado = q
            } else {
                filterEmpleado = user.id_empleado
            }

            const result = await service.list({
                limit: Number.isNaN(limit) ? undefined : limit,
                offset: Number.isNaN(offset) ? undefined : offset,
                idEmpleado: filterEmpleado,
            })
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}
