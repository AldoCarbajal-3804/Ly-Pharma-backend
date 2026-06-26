import { prisma } from "../../config/database"
import type { PorcentajeResponse } from "../../utils/consults/reports/response"

export class PorcentajesService {

    async getPorcentajeProductos(): Promise<{
        por_proveedor: PorcentajeResponse[]
        por_categoria: PorcentajeResponse[]
        por_tipo: PorcentajeResponse[]
    }> {
        const [proveedores, categorias, tipos, totalProductos] = await Promise.all([
            prisma.proveedores.findMany({
                select: {
                    nombre_empresa: true,
                    _count: { select: { productos: true } },
                },
            }),
            prisma.categorias.findMany({
                select: {
                    nombre: true,
                    _count: { select: { productos: true } },
                },
            }),
            prisma.tipos_medicamento.findMany({
                select: {
                    nombre: true,
                    _count: { select: { productos: true } },
                },
            }),
            prisma.productos.count(),
        ])

        const toPorcentaje = (items: { nombre: string; count: number }[], total: number) =>
            items.map((i) => ({
                nombre: i.nombre,
                total: i.count,
                porcentaje: total > 0 ? Math.round((i.count / total) * 10000) / 100 : 0,
            }))

        return {
            por_proveedor: toPorcentaje(
                proveedores.map((p) => ({ nombre: p.nombre_empresa, count: p._count.productos })),
                totalProductos,
            ),
            por_categoria: toPorcentaje(
                categorias.map((c) => ({ nombre: c.nombre, count: c._count.productos })),
                totalProductos,
            ),
            por_tipo: toPorcentaje(
                tipos.map((t) => ({ nombre: t.nombre, count: t._count.productos })),
                totalProductos,
            ),
        }
    }

    async getPorcentajeVentas(): Promise<{
        por_proveedor: PorcentajeResponse[]
        por_categoria: PorcentajeResponse[]
        por_tipo: PorcentajeResponse[]
    }> {
        const [ventasProveedor, ventasCategoria, ventasTipo, totalVendido] = await Promise.all([
            prisma.$queryRaw<{ nombre: string; total: bigint }[]>`
                SELECT pv.nombre_empresa AS nombre, COALESCE(SUM(dv.cantidad), 0) AS total
                FROM detalle_venta dv
                JOIN productos p ON p.id_producto = dv.id_producto
                JOIN proveedores pv ON pv.id_proveedor = p.id_proveedor
                GROUP BY pv.nombre_empresa
                ORDER BY total DESC
            `,
            prisma.$queryRaw<{ nombre: string; total: bigint }[]>`
                SELECT c.nombre::text AS nombre, COALESCE(SUM(dv.cantidad), 0) AS total
                FROM detalle_venta dv
                JOIN productos p ON p.id_producto = dv.id_producto
                JOIN categorias c ON c.id_categoria = p.id_categoria
                GROUP BY c.nombre
                ORDER BY total DESC
            `,
            prisma.$queryRaw<{ nombre: string; total: bigint }[]>`
                SELECT tm.nombre::text AS nombre, COALESCE(SUM(dv.cantidad), 0) AS total
                FROM detalle_venta dv
                JOIN productos p ON p.id_producto = dv.id_producto
                JOIN tipos_medicamento tm ON tm.id_tipo = p.id_tipo
                GROUP BY tm.nombre
                ORDER BY total DESC
            `,
            prisma.detalle_venta.aggregate({
                _sum: { cantidad: true },
            }),
        ])

        const total = Number(totalVendido._sum.cantidad ?? 0)

        const toPorcentaje = (items: { nombre: string; total: bigint }[]) =>
            items.map((i) => ({
                nombre: i.nombre,
                total: Number(i.total),
                porcentaje: total > 0 ? Math.round((Number(i.total) / total) * 10000) / 100 : 0,
            }))

        return {
            por_proveedor: toPorcentaje(ventasProveedor),
            por_categoria: toPorcentaje(ventasCategoria),
            por_tipo: toPorcentaje(ventasTipo),
        }
    }
}
