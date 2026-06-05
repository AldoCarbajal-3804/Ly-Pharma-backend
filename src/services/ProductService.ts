
import {prisma} from "../config/database"
import {Productos} from "../entities/productos"
import type {ProductoRequest} from "../types/productos/request"
import type {ProductoResponse} from "../types/productos/response"
import { MapperProducto } from "../utils/mappers/MapperProducto"

export class ProductService {

    async list(): Promise<ProductoResponse[]> {
        const productos = await prisma.productos.findMany({
            include: {
                tipo: true,
                categoria: true,
            },
        })
        
        return productos.map(p => {
            const productoEntity = Productos.fromPrisma(p)
            return MapperProducto.toResponse(
                productoEntity
            )
        })
    }

    async create(request: ProductoRequest): Promise<ProductoResponse> {
        const productoEntity = MapperProducto.fromRequest(request)
        const productoPrisma = await prisma.productos.create({
            data: {
                nombre_producto: productoEntity.nombre_producto,
                descripcion: productoEntity.descripcion,
                precio_unitario: productoEntity.precio_unitario,
                cantidad_stock: productoEntity.cantidad_stock,
                id_proveedor: productoEntity.id_proveedor,
                detalles: productoEntity.detalles,
                id_tipo: productoEntity.id_tipo,
                id_categoria: productoEntity.id_categoria,
                fecha_vencimiento: productoEntity.fecha_vencimiento,
            },
        })
        return MapperProducto.toResponse(Productos.fromPrisma(productoPrisma))
    }

    async delete(id_producto: number): Promise<void> {
        await prisma.productos.delete({
            where: {
                id_producto,
            },
        })
    }

    async update(id_producto: number, request: ProductoRequest): Promise<ProductoResponse> {
        const productoEntity = MapperProducto.fromRequest(request)
        const productoPrisma = await prisma.productos.update({
            where: {
                id_producto,
            },
            data: {
                nombre_producto: productoEntity.nombre_producto,
                descripcion: productoEntity.descripcion,
                precio_unitario: productoEntity.precio_unitario,
                cantidad_stock: productoEntity.cantidad_stock,
                id_proveedor: productoEntity.id_proveedor,
                detalles: productoEntity.detalles,
                id_tipo: productoEntity.id_tipo,
                id_categoria: productoEntity.id_categoria,
                fecha_vencimiento: productoEntity.fecha_vencimiento,
            },
        })
        return MapperProducto.toResponse(Productos.fromPrisma(productoPrisma))
    }

    
}
