export interface GananciasRequest {
    periodo: "dia" | "semana" | "mes" | "anio"
}

export interface RankingRequest {
    limite?: number
}

export interface ProductosMasVendidosRequest {
    limite?: number
}
