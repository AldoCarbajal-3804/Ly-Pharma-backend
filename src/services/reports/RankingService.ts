import { prisma } from "../../config/database"
import type { RankingEmpleado } from "../../utils/consults/reports/response"

export class RankingService {

    async getRanking(limite = 10): Promise<RankingEmpleado[]> {
        const empleados = await prisma.empleados.findMany({
            select: {
                id_empleado: true,
                nombres: true,
                apellidos: true,
                ventas: {
                    select: { total_venta: true },
                },
            },
        })

        const ranking: RankingEmpleado[] = empleados.map((e) => ({
            id_empleado: e.id_empleado,
            nombres: e.nombres,
            apellidos: e.apellidos,
            total_ventas: e.ventas.length,
            total_ganancias: e.ventas.reduce((sum, v) => sum + Number(v.total_venta), 0),
        }))

        ranking.sort((a, b) => b.total_ventas - a.total_ventas || b.total_ganancias - a.total_ganancias)

        return ranking.slice(0, limite)
    }
}
