import { prisma } from "../../config/database"
import { Productos } from "../../entities/productos"
import type { ProductoResponse } from "../../types/productos/response"
import type { ProductoRequest } from "../../types/productos/request"
import { EnumCategoria, EnumTipo } from "../../generated/prisma/enums"

const CATEGORIA_MAP: Record<string, EnumCategoria> = {
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

const TIPO_MAP: Record<string, EnumTipo> = {
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

    private static async resolveCategoriaId(nombre: string): Promise<number> {
        const member = CATEGORIA_MAP[nombre]
        if (!member) throw new Error(`Categoría "${nombre}" no válida`)
        const categoria = await prisma.categorias.findFirst({ where: { nombre: member } })
        if (!categoria) throw new Error(`Categoría "${nombre}" no encontrada`)
        return categoria.id_categoria
    }

    private static async resolveTipoId(nombre: string): Promise<number> {
        const member = TIPO_MAP[nombre]
        if (!member) throw new Error(`Tipo "${nombre}" no válido`)
        const tipo = await prisma.tipos_medicamento.findFirst({ where: { nombre: member } })
        if (!tipo) throw new Error(`Tipo "${nombre}" no encontrado`)
        return tipo.id_tipo
    }

    private static async resolveProveedorId(nombre: string): Promise<number> {
        const proveedor = await prisma.proveedores.findFirst({ where: { nombre_empresa: nombre } })
        if (!proveedor) throw new Error(`Proveedor "${nombre}" no encontrado`)
        return proveedor.id_proveedor
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


    static async fromRequest(request: ProductoRequest): Promise<Omit<Productos, "id_producto">> {
        const [id_categoria, id_tipo, id_proveedor] = await Promise.all([
            this.resolveCategoriaId(request.categoria),
            this.resolveTipoId(request.tipo),
            this.resolveProveedorId(request.proveedor),
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
            request.fecha_vencimiento,
        )
    }
}
