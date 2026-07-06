import { prisma } from "../../config/database"
import type { DashboardResumen } from "../../utils/consults/muestra/response"

export class MuestraService {

    async getAdminSummary(): Promise<DashboardResumen> {
        const [row] = await prisma.$queryRaw<DashboardResumen[]>`
            SELECT * FROM resumen_admin_diario()
        `
        return {
            total_productos_vendidos: Number(row.total_productos_vendidos),
            ganancia_diaria: Number(row.ganancia_diaria),
            stock_bajo: Number(row.stock_bajo),
            productos_por_vencer: Number(row.productos_por_vencer),
        }
    }

    async getEmployeeSummary(idEmpleado: number): Promise<DashboardResumen> {
        const [row] = await prisma.$queryRaw<DashboardResumen[]>`
            SELECT * FROM resumen_empleado_diario(${idEmpleado})
        `
        return {
            total_productos_vendidos: Number(row.total_productos_vendidos),
            ganancia_diaria: Number(row.ganancia_diaria),
            stock_bajo: Number(row.stock_bajo),
            productos_por_vencer: Number(row.productos_por_vencer),
        }
    }
}
