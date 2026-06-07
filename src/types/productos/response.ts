export interface ProductoResponse {
    id_producto: number
    nombre: string
    stock: number
    precio_unitario: number
    categoria: string
    tipo: string
    proveedor: string
    fecha_vencimiento: Date
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    limit: number | null
    offset: number | null
}
