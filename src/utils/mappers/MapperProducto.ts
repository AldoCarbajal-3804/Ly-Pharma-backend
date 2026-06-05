import { prisma } from "../../config/database"
import { Productos } from "../../entities/productos"
import { EnumCategoria, EnumTipo } from "../../generated/prisma/enums"
import type { ProductoResponse } from "../../types/productos/response"
import type { ProductoRequest } from "../../types/productos/request"

const CATEGORIA_MAP: Record<string, string> = {
    "Antibiótico": EnumCategoria.Antibiotico,
    "Analgésico": EnumCategoria.Analgesico,
    "Antihistamínico": EnumCategoria.Antihistaminico,
    "Antiinflamatorio": EnumCategoria.Antiinflamatorio,
    "Gastrointestinal": EnumCategoria.Gastrointestinal,
    "Antidiabético": EnumCategoria.Antidiabetico,
    "Cardiovascular": EnumCategoria.Cardiovascular,
    "Respiratorio": EnumCategoria.Respiratorio,
    "Neurológico": EnumCategoria.Neurologico,
    "Dermatológico": EnumCategoria.Dermatologico,
    "Suplemento": EnumCategoria.Suplemento,
}

const TIPO_MAP: Record<string, string> = {
    "Tabletas": EnumTipo.Tabletas,
    "Cápsulas": EnumTipo.Capsulas,
    "Inhalador": EnumTipo.Inhalador,
    "Crema": EnumTipo.Crema,
}

export class MapperProducto {

    private static async getCategoriaNombre(id: number): Promise<string> {
        const categoria = await prisma.categorias.findUnique({ where: { id_categoria: id } })
        return categoria?.nombre ?? ""
    }

    private static async getTipoNombre(id: number): Promise<string> {
        const tipo = await prisma.tipos_medicamento.findUnique({ where: { id_tipo: id } })
        return tipo?.nombre ?? ""
    }
    
    private static async getProveedorNombre(id: number): Promise<string> {
        const proveedor = await prisma.proveedores.findUnique({ where: { id_proveedor: id } })
        return proveedor?.nombre_empresa ?? ""
    }

    static async toResponse(producto: Productos): Promise<ProductoResponse> {
        const [categoria, tipo, proveedor] = await Promise.all([
            this.getCategoriaNombre(producto.id_categoria),
            this.getTipoNombre(producto.id_tipo),
            this.getProveedorNombre(producto.id_proveedor),
        ])
        return {
            id_producto: producto.id_producto,
            nombre: producto.nombre_producto,
            stock: producto.cantidad_stock,
            precio_unitario: producto.precio_unitario,
            categoria,
            tipo,
            proveedor,
            fecha_vencimiento: producto.fecha_vencimiento,
        }
    }

    private static async getProveedorId(nombre: string): Promise<number> {
        const proveedor = await prisma.proveedores.findFirst({ where: { nombre_empresa: nombre } })
        return proveedor?.id_proveedor ?? 0
    }

    private static async getCategoriaId(nombre: string): Promise<number> {
        const enumVal = CATEGORIA_MAP[nombre]
        if (!enumVal) return 0
        const categoria = await prisma.categorias.findFirst({ where: { nombre: enumVal as any } })
        return categoria?.id_categoria ?? 0
    }

    private static async getTipoId(nombre: string): Promise<number> {
        const enumVal = TIPO_MAP[nombre]
        if (!enumVal) return 0
        const tipo = await prisma.tipos_medicamento.findFirst({ where: { nombre: enumVal as any } })
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
