import { prisma } from "../../config/database"
import type { GananciasResponse } from "../../utils/consults/reports/response"

export class GananciasService {

    async getGanancias(periodo: string, idEmpleado?: number): Promise<GananciasResponse> {
        const now = new Date()
        let start: Date

        switch (periodo) {
            case "dia":
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
                break
            case "semana":
                start = new Date(now)
                start.setDate(start.getDate() - start.getDay())
                start.setHours(0, 0, 0, 0)
                break
            case "mes":
                start = new Date(now.getFullYear(), now.getMonth(), 1)
                break
            case "anio":
                start = new Date(now.getFullYear(), 0, 1)
                break
            default:
                start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        }

        const where: Record<string, unknown> = {
            fecha_venta: { gte: start, lte: now },
        }
        if (idEmpleado !== undefined) {
            where.id_empleado = idEmpleado
        }

        const ventas = await prisma.ventas.findMany({
            where,
            select: { total_venta: true },
        })

        return {
            periodo,
            total_ventas: ventas.length,
            total_ganancias: ventas.reduce((sum, v) => sum + Number(v.total_venta), 0),
        }
    }
}
