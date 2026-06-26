export interface GananciasResponse {
    periodo: string
    total_ganancias: number
    total_ventas: number
}

export interface RankingEmpleado {
    id_empleado: number
    nombres: string
    apellidos: string
    total_ventas: number
    total_ganancias: number
}

export interface ProductoRanking {
    id_producto: number
    nombre: string
    total_vendido: number
    total_ingresos: number
}

export interface PorcentajeResponse {
    nombre: string
    total: number
    porcentaje: number
}
