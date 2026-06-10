import { prisma } from "../config/database"
import { DashboardData } from "../types/dashboard/data"

const STOCK_BAJO_UMBRAL = 10
const MESES_POR_VENCER = 2


export class DashboardService {

  async getDashboard(idEmpleado?: number): Promise<DashboardData> {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    const manana = new Date(hoy)
    manana.setDate(manana.getDate() + 1)

    const fechaLimite = new Date(hoy)
    fechaLimite.setMonth(fechaLimite.getMonth() + MESES_POR_VENCER)

    const whereVentas: Record<string, unknown> = {
      fecha_venta: { gte: hoy, lt: manana },
    }
    if (idEmpleado) {
      whereVentas.id_empleado = idEmpleado
    }

    const [ventas, totalVentasCount, stockBajoCount, porVencerCount] = await Promise.all([
      prisma.ventas.findMany({
        where: whereVentas,
        include: { empleado: true },
        orderBy: { fecha_venta: "desc" },
      }),
      prisma.ventas.count({ where: whereVentas }),
      prisma.productos.count({
        where: { cantidad_stock: { lt: STOCK_BAJO_UMBRAL } },
      }),
      prisma.productos.count({
        where: { fecha_vencimiento: { lte: fechaLimite } },
      }),
    ])

    const gananciaDiaria = ventas.reduce((acc, v) => acc + Number(v.total_venta), 0)

    return {
      ventas_dia: ventas.map((v) => ({
        id_venta: v.id_venta,
        empleado: `${v.empleado.nombres} ${v.empleado.apellidos}`,
        total: Number(v.total_venta),
        fecha: v.fecha_venta,
      })),
      total_ventas_dia: totalVentasCount,
      stock_bajo: stockBajoCount,
      productos_por_vencer: porVencerCount,
      ganancia_diaria: Math.round(gananciaDiaria * 100) / 100,
    }
  }
}
