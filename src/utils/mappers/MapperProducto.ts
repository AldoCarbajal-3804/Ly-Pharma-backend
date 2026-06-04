import { Productos } from "../../entities/productos"
import type { ProductoResponse } from "../../types/productos/response"
import type { ProductoRequest } from "../../types/productos/request"
import { randomUUID } from "crypto"

export class MapperProducto {
    
    static toResponse(producto: Productos): ProductoResponse {
        return {
            id_producto: producto.id_producto,
            nombre: producto.nombre_producto,
            stock: producto.cantidad_stock,
            precio_unitario: producto.precio_unitario,
            id_categoria: producto.id_categoria,
            id_tipo: producto.id_tipo,
            fecha_vencimiento: producto.fecha_vencimiento,
        }
    }


    static fromRequest(
        request: ProductoRequest,
        idProducto: string = randomUUID()
    ): Productos {
        return Productos.create(
            idProducto,
            request.nombre,
            request.descripcion,
            request.precio_unitario,
            request.stock,
            request.id_proveedor,
            request.detalles,
            request.id_tipo,
            request.id_categoria,
            request.fecha_vencimiento,
        )
    }
}
