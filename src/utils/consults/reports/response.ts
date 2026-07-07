export interface GananciasDetalle {
    rango?: string
    dia?: string
    semana?: string
    mes?: string
    total_ventas: number
    total_ganancias: number
}

export interface GananciasResponse {
    periodo: string
    detalle: GananciasDetalle[]
    total_ventas: number
    total_ganancias: number
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
