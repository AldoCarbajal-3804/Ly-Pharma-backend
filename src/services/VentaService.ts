import { prisma } from "../config/database"
import { createVentaSchema } from "../types/ventas/request"
import type { VentaResponse, PaginatedVentasResponse } from "../types/ventas/response"
import { MapperVenta } from "../utils/mappers/MapperVenta"

export class VentaService {

    async create(data: unknown, idEmpleado: number): Promise<VentaResponse> {
        const { cliente: c, productos } = createVentaSchema.parse(data)

        const cliente = await prisma.clientes.upsert({
            where: { dni: c.dni },
            update: { nombres: c.nombres, apellidos: c.apellidos },
            create: { nombres: c.nombres, apellidos: c.apellidos, dni: c.dni },
        })

        const productosMap: { id_producto: number; cantidad: number }[] = []
        for (const p of productos) {
            const prod = await prisma.productos.findUnique({
                where: { id_producto: p.id_producto },
            })
            if (!prod) {
                throw new Error(`Producto con ID ${p.id_producto} no encontrado`)
            }
            productosMap.push({ id_producto: prod.id_producto, cantidad: p.cantidad })
        }

        const venta = await prisma.ventas.create({
            data: {
                    id_cliente: cliente.id_cliente,
                    id_empleado: idEmpleado,
                    fecha_venta: new Date(),
                    total_venta: 0,
                    igv: 0,
                    detalles: {
                        create: productosMap.map((p) => ({
                            id_producto: p.id_producto,
                            cantidad: p.cantidad,
                        })),
                    },
                },
            include: {
                cliente: true,
                empleado: true,
                detalles: { include: { producto: true } },
            },
        })

        return MapperVenta.toResponse(venta)
    }

    async getById(idVenta: number): Promise<VentaResponse> {
        const venta = await prisma.ventas.findUnique({
            where: { id_venta: idVenta },
            include: {
                cliente: true,
                empleado: true,
                detalles: { include: { producto: true } },
            },
        })

        if (!venta) {
            throw new Error("Venta no encontrada")
        }

        return MapperVenta.toResponse(venta)
    }

    async list(opts?: {
        limit?: number
        offset?: number
        idEmpleado?: number
    }): Promise<PaginatedVentasResponse> {
        const where: Record<string, unknown> = {}
        if (opts?.idEmpleado) {
            where.id_empleado = opts.idEmpleado
        }

        const [ventas, total] = await Promise.all([
            prisma.ventas.findMany({
                where,
                include: {
                    cliente: true,
                    empleado: true,
                    detalles: { include: { producto: true } },
                },
                orderBy: { fecha_venta: "desc" },
                take: opts?.limit,
                skip: opts?.offset,
            }),
            prisma.ventas.count({ where }),
        ])

        return {
            data: ventas.map((v) => MapperVenta.toResponse(v)),
            total,
            limit: opts?.limit ?? null,
            offset: opts?.offset ?? null,
        }
    }
}
