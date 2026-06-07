export interface DetalleBoleta {
    nombre: string
    cantidad: number
    precio_unitario: number
    importe: number
}

export interface VentaResponse {
    id_venta: number
    cliente: {
        nombres: string
        apellidos: string
        dni: string
    }
    empleado: {
        nombres: string
        apellidos: string
    }
    fecha: Date
    productos: DetalleBoleta[]
    subtotal: number
    igv: number
    total: number
}

export interface PaginatedVentasResponse {
    data: VentaResponse[]
    total: number
    limit: number | null
    offset: number | null
}
