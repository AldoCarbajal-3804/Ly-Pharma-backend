export interface InicioData {
    ventas_dia: {
        id_venta: number
        empleado: string
        total: number
        fecha: Date
    }[]
    total_ventas_dia: number
    stock_bajo: number
    productos_por_vencer: number
    ganancia_diaria: number
}