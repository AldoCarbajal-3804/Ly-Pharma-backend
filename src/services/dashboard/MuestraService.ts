import { prisma } from "../../config/database"
import type { AdminSummary, EmployeeSummary } from "../../utils/consults/muestra/response"

function getPeruDayRange() {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const peruTime = utc - 5 * 3600000
    const peruDate = new Date(peruTime)

    const start = new Date(Date.UTC(
        peruDate.getUTCFullYear(),
        peruDate.getUTCMonth(),
        peruDate.getUTCDate(),
    ))

    const end = new Date(start.getTime() + 86400000)
    return { start, end }
}

export class MuestraService {

    async getEmployeeSummary(idEmpleado: number): Promise<EmployeeSummary> {
        const { start, end } = getPeruDayRange()
        const now = new Date()
        const twoMonthsAhead = new Date(start)
        twoMonthsAhead.setUTCMonth(twoMonthsAhead.getUTCMonth() + 2)

        const [ventasHoy, stockBajo, porVencer] = await Promise.all([
            prisma.ventas.findMany({
                where: {
                    id_empleado: idEmpleado,
                    fecha_venta: { gte: start, lt: end },
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
        const { start, end } = getPeruDayRange()
        const now = new Date()
        const twoMonthsAhead = new Date(start)
        twoMonthsAhead.setUTCMonth(twoMonthsAhead.getUTCMonth() + 2)

        const [ventasHoy, totalVendidos, stockBajo, porVencer] = await Promise.all([
            prisma.ventas.findMany({
                where: {
                    fecha_venta: { gte: start, lt: end },
                },
            }),
            prisma.detalle_venta.aggregate({
                where: {
                    venta: {
                        fecha_venta: { gte: start, lt: end },
                    },
                },
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
