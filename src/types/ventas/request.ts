export interface CreateVentaRequest {
    cliente: {
        nombres: string
        apellidos: string
        dni: string
    }
    productos: {
        id_producto: number
        cantidad: number
    }[]
}
