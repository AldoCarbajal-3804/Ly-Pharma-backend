import { prisma } from "../../config/database"
import type { ProductoRanking } from "../../utils/consults/reports/response"

export class ProductosMasVendidosService {

    async getProductosMasVendidos(limite = 10): Promise<ProductoRanking[]> {
        const resultados = await prisma.detalle_venta.groupBy({
            by: ["id_producto"],
            _sum: { cantidad: true },
            orderBy: { _sum: { cantidad: "desc" } },
            take: limite,
        })

        const productos = await prisma.productos.findMany({
            where: {
                id_producto: { in: resultados.map((r) => r.id_producto) },
            },
            select: { id_producto: true, nombre_producto: true, precio_unitario: true },
        })

        const productoMap = new Map(productos.map((p) => [p.id_producto, p]))

        return resultados.map((r) => {
            const prod = productoMap.get(r.id_producto)
            const cantidad = r._sum.cantidad ?? 0
            return {
                id_producto: r.id_producto,
                nombre: prod?.nombre_producto ?? "Desconocido",
                total_vendido: cantidad,
                total_ingresos: cantidad * Number(prod?.precio_unitario ?? 0),
            }
        })
    }
}
