import { prisma } from "../../config/database"
import { Productos } from "../../entities/productos"
import type { ProductoResponse } from "../../types/productos/response"
import type { ProductoRequest } from "../../types/productos/request"

export class MapperProducto {

    private static async getCategoriaNombre(id: number): Promise<string> {
        const categoria = await prisma.categorias.findUnique({ where: { id_categoria: id } })
        return categoria?.nombre ?? ""
    }

    private static async getTipoNombre(id: number): Promise<string> {
        const tipo = await prisma.tipos_medicamento.findUnique({ where: { id_tipo: id } })
        return tipo?.nombre ?? ""
    }
    
    static async toResponse(producto: Productos): Promise<ProductoResponse> {
        const [categoria, tipo] = await Promise.all([
            this.getCategoriaNombre(producto.id_categoria),
            this.getTipoNombre(producto.id_tipo),
        ])
        return {
            id_producto: producto.id_producto,
            nombre: producto.nombre_producto,
            stock: producto.cantidad_stock,
            precio_unitario: producto.precio_unitario,
            categoria,
            tipo,
            fecha_vencimiento: producto.fecha_vencimiento,
        }
    }


    static fromRequest(request: ProductoRequest): Omit<Productos, "id_producto"> {
        return Productos.create(
            request.nombre,
            request.descripcion,
            request.precio_unitario,
            request.stock,
            request.id_proveedor,
            request.detalles,
            request.id_tipo,
            request.id_categoria,
            new Date(request.fecha_vencimiento),
        )
    }
}
