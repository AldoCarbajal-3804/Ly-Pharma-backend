import { prisma } from "../../config/database"
import type { DashboardResumen } from "../../utils/consults/muestra/response"

export class MuestraService {

    async getAdminSummary(): Promise<DashboardResumen> {
        const rows = await prisma.$queryRaw<DashboardResumen[]>`
            SELECT * FROM admin_resumen_diario()
        `
        return rows[0]
    }

    async getEmployeeSummary(idEmpleado: number): Promise<DashboardResumen> {
        const rows = await prisma.$queryRaw<DashboardResumen[]>`
            SELECT * FROM empleado_resumen_diario(${idEmpleado})
        `
        return rows[0]
    }
}
