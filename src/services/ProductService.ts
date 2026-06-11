import { prisma } from "../config/database"
import { createProductoSchema, updateProductoSchema } from "../types/productos/request"
import type { ProductoFilters } from "../types/productos/filters"
import type { ProductoResponse, PaginatedResponse } from "../types/productos/response"
import { MapperProducto } from "../utils/mappers/MapperProducto"
import type { productos } from "../generated/prisma/client"

export class ProductService {

    async list(filters?: ProductoFilters): Promise<PaginatedResponse<ProductoResponse>> {
        const where: Record<string, unknown> = {}

        if (filters?.categoria_id) {
            where.id_categoria = filters.categoria_id
        } else if (filters?.categoria?.toLowerCase) {
            const cat = await prisma.categorias.findFirst({
                where: { nombre: filters.categoria.toLowerCase() as any },
            })
            if (cat) where.id_categoria = cat.id_categoria
        }

        if (filters?.tipo_id) {
            where.id_tipo = filters.tipo_id
        } else if (filters?.tipo?.toLowerCase) {
            const tip = await prisma.tipos_medicamento.findFirst({
                where: { nombre: filters.tipo.toLowerCase() as any },
            })
            if (tip) where.id_tipo = tip.id_tipo
        }

        if (filters?.proveedor_id) {
            where.id_proveedor = filters.proveedor_id
        } else if (filters?.proveedor?.toLowerCase) {
            const prov = await prisma.proveedores.findFirst({
                where: { nombre_empresa: filters.proveedor.toLowerCase() as any },
            })
            if (prov) where.id_proveedor = prov.id_proveedor
        }

    const [productos, total] = await Promise.all([
        prisma.productos.findMany({
            where,
            include: { categoria: true, tipo: true, proveedor: true },
            take: filters?.limit,
            skip: filters?.offset,
        }),
        prisma.productos.count({ where }),
    ])

    return {
            data: productos.map((p: productos) => MapperProducto.toResponse(p)),
            total,
            limit: filters?.limit ?? null,
            offset: filters?.offset ?? null,
        }
    }

    async listLowStock(umbral = 10): Promise<{ nombre: string; stock: number }[]> {
        const productos = await prisma.productos.findMany({
            where: { cantidad_stock: { lt: umbral } },
            select: { nombre_producto: true, cantidad_stock: true },
            orderBy: { cantidad_stock: "asc" },
        })
        return productos.map((p) => ({ nombre: p.nombre_producto, stock: p.cantidad_stock }))
    }

    async listExpiring(dias = 60): Promise<{ nombre: string; stock: number; fecha_vencimiento: string }[]> {
        const fechaLimite = new Date()
        fechaLimite.setDate(fechaLimite.getDate() + dias)
        const productos = await prisma.productos.findMany({
            where: { fecha_vencimiento: { lte: fechaLimite } },
            select: { nombre_producto: true, cantidad_stock: true, fecha_vencimiento: true },
            orderBy: { fecha_vencimiento: "asc" },
        })
        return productos.map((p) => ({
            nombre: p.nombre_producto,
            stock: p.cantidad_stock,
            fecha_vencimiento: p.fecha_vencimiento.toISOString().split("T")[0],
        }))
    }

    async create(request: unknown): Promise<ProductoResponse> {
        const parsed = createProductoSchema.parse(request)
        const productoEntity = await MapperProducto.fromRequest(parsed)
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
        return MapperProducto.toResponse(
        await prisma.productos.findUniqueOrThrow({
                where: { id_producto: productoPrisma.id_producto },
                include: { categoria: true, tipo: true, proveedor: true },
            })
        )
    }

    async delete(id_producto: number): Promise<void> {
        await prisma.productos.delete({
            where: { id_producto },
        })
    }

    async update(id_producto: number, request: unknown): Promise<ProductoResponse> {
        const parsed = updateProductoSchema.parse(request)
        const data: Record<string, unknown> = {}
        const fields: [string, keyof typeof parsed][] = [
            ["nombre_producto", "nombre"],
            ["descripcion", "descripcion"],
            ["precio_unitario", "precio_unitario"],
            ["cantidad_stock", "stock"],
            ["detalles", "detalles"],
            ["fecha_vencimiento", "fecha_vencimiento"],
        ]
        for (const [db, key] of fields) {
            if (parsed[key] !== undefined) data[db] = parsed[key] instanceof Date ? parsed[key] : parsed[key]
        }
        if (parsed.proveedor !== undefined) {
            const prov = await prisma.proveedores.findFirst({ where: { nombre_empresa: parsed.proveedor } })
            if (prov) data.id_proveedor = prov.id_proveedor
        }
        if (parsed.categoria !== undefined) {
            const cat = await prisma.categorias.findFirst({ where: { nombre: parsed.categoria as any } })
            if (cat) data.id_categoria = cat.id_categoria
        }
        if (parsed.tipo !== undefined) {
            const tip = await prisma.tipos_medicamento.findFirst({ where: { nombre: parsed.tipo as any } })
            if (tip) data.id_tipo = tip.id_tipo
        }
        await prisma.productos.update({ where: { id_producto }, data })
        return MapperProducto.toResponse(
            await prisma.productos.findUniqueOrThrow({
                where: { id_producto },
                include: { categoria: true, tipo: true, proveedor: true },
            })
        )
    }
}
