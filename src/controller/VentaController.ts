import type { Request, Response } from "express"
import { VentaService } from "../services/VentaService"
import type { CreateVentaRequest } from "../types/ventas/request"

const service = new VentaService()

export class VentaController {

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const data: CreateVentaRequest = req.body
            const idEmpleado = res.locals.user.id_empleado

            if (!data.cliente || !data.productos) {
                res.status(400).json({ message: "cliente y productos son requeridos" })
                return
            }

            const venta = await service.create(data, idEmpleado)
            res.status(201).json(venta)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            const status = message.startsWith("Stock insuficiente") || message.includes("no encontrado") || message.includes("DNI") || message.includes("Debe incluir") ? 400 : 500
            res.status(status).json({ message })
        }
    }

    static async getById(req: Request, res: Response): Promise<void> {
        try {
            const idVenta = Number(req.params.id_venta)
            if (Number.isNaN(idVenta)) {
                res.status(400).json({ message: "ID de venta inválido" })
                return
            }
            const venta = await service.getById(idVenta)
            res.json(venta)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            const status = message === "Venta no encontrada" ? 404 : 500
            res.status(status).json({ message })
        }
    }

    static async list(req: Request, res: Response): Promise<void> {
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
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            res.status(500).json({ message })
        }
    }
}
