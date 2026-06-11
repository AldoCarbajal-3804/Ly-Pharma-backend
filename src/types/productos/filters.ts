export interface ProductoFilters {
    categoria?: string
    categoria_id?: number
    tipo?: string
    tipo_id?: number
    proveedor?: string
    proveedor_id?: number
    limit?: number
    offset?: number
    stock?: "asc" | "desc"
    vencimiento?: "asc" | "desc"
}
