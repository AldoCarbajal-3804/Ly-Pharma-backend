import { prisma } from "../../config/database"
import { Productos } from "../../entities/productos"
import type { ProductoResponse } from "../../types/productos/response"
import type { ProductoRequest } from "../../types/productos/request"

export class MapperProducto {

    static toResponse(producto: any): ProductoResponse {
        return {
            id_producto: producto.id_producto,
            nombre: producto.nombre_producto,
            stock: producto.cantidad_stock,
            precio_unitario: Number(producto.precio_unitario),
            categoria: producto.categoria?.nombre ?? "",
            tipo: producto.tipo?.nombre ?? "",
            proveedor: producto.proveedor?.nombre_empresa ?? "",
            fecha_vencimiento: producto.fecha_vencimiento,
        }
    }

    private static async getProveedorId(nombre: string): Promise<number> {
        const proveedor = await prisma.proveedores.findFirst({ where: { nombre_empresa: nombre } })
        return proveedor?.id_proveedor ?? 0
    }

    private static async getCategoriaId(nombre: string): Promise<number> {
        const categoria = await prisma.categorias.findFirst({ where: { nombre: nombre as any } })
        return categoria?.id_categoria ?? 0
    }

    private static async getTipoId(nombre: string): Promise<number> {
        const tipo = await prisma.tipos_medicamento.findFirst({ where: { nombre: nombre as any } })
        return tipo?.id_tipo ?? 0
    }

    static async fromRequest(request: ProductoRequest): Promise<Omit<Productos, "id_producto">> {
        const [id_proveedor, id_categoria, id_tipo] = await Promise.all([
            this.getProveedorId(request.proveedor),
            this.getCategoriaId(request.categoria),
            this.getTipoId(request.tipo),
        ])
        return Productos.create(
            request.nombre,
            request.descripcion,
            request.precio_unitario,
            request.stock,
            id_proveedor,
            request.detalles,
            id_tipo,
            id_categoria,
            new Date(request.fecha_vencimiento),
        )
    }
}
