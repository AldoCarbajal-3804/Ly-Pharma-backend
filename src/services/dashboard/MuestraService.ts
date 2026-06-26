import { prisma } from "../../config/database"
import type { AdminSummary, EmployeeSummary } from "../../utils/consults/muestra/response"

export class MuestraService {

    async getEmployeeSummary(idEmpleado: number): Promise<EmployeeSummary> {
        const now = new Date()
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const endOfDay = new Date(startOfDay)
        endOfDay.setDate(endOfDay.getDate() + 1)

        const twoMonthsAhead = new Date(startOfDay)
        twoMonthsAhead.setMonth(twoMonthsAhead.getMonth() + 2)

        const [ventasHoy, stockBajo, porVencer] = await Promise.all([
            prisma.ventas.findMany({
                where: {
                    id_empleado: idEmpleado,
                    fecha_venta: { gte: startOfDay, lt: endOfDay },
                },
            }),
            prisma.productos.count({
                where: { cantidad_stock: { lt: 10 } },
            }),
            prisma.productos.count({
                where: {
                    fecha_vencimiento: { gte: now, lte: twoMonthsAhead },
                },
            }),
        ])

        return {
            total_ventas_dia: ventasHoy.length,
            ganancia_diaria: ventasHoy.reduce((sum, v) => sum + Number(v.total_venta), 0),
            stock_bajo: stockBajo,
            productos_por_vencer: porVencer,
        }
    }

    async getAdminSummary(): Promise<AdminSummary> {
        const now = new Date()
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const endOfDay = new Date(startOfDay)
        endOfDay.setDate(endOfDay.getDate() + 1)

        const twoMonthsAhead = new Date(startOfDay)
        twoMonthsAhead.setMonth(twoMonthsAhead.getMonth() + 2)

        const [ventasHoy, totalVendidos, stockBajo, porVencer] = await Promise.all([
            prisma.ventas.findMany({
                where: {
                    fecha_venta: { gte: startOfDay, lt: endOfDay },
                },
            }),
            prisma.detalle_venta.aggregate({
                _sum: { cantidad: true },
            }),
            prisma.productos.count({
                where: { cantidad_stock: { lt: 10 } },
            }),
            prisma.productos.count({
                where: {
                    fecha_vencimiento: { gte: now, lte: twoMonthsAhead },
                },
            }),
        ])

        return {
            total_productos_vendidos: totalVendidos._sum.cantidad ?? 0,
            ganancia_diaria: ventasHoy.reduce((sum, v) => sum + Number(v.total_venta), 0),
            stock_bajo: stockBajo,
            productos_por_vencer: porVencer,
        }
    }
}
