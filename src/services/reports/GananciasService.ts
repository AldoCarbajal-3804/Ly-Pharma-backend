import { prisma } from "../../config/database"
import type { GananciasResponse, GananciasDetalle } from "../../utils/consults/reports/response"

type FilaRaw = {
    rango?: string
    dia?: string
    semana?: string
    mes?: string
    total_ventas: number | bigint | string
    total_ganancias: number | bigint | string
}

function normalizarFila(f: FilaRaw): GananciasDetalle {
    return {
        ...(f.rango !== undefined && { rango: f.rango }),
        ...(f.dia !== undefined && { dia: f.dia }),
        ...(f.semana !== undefined && { semana: f.semana }),
        ...(f.mes !== undefined && { mes: f.mes }),
        total_ventas: Number(f.total_ventas),
        total_ganancias: Number(f.total_ganancias),
    }
}

function sumar(filas: GananciasDetalle[]): { total_ventas: number; total_ganancias: number } {
    return filas.reduce(
        (acc, f) => ({
            total_ventas: acc.total_ventas + f.total_ventas,
            total_ganancias: acc.total_ganancias + f.total_ganancias,
        }),
        { total_ventas: 0, total_ganancias: 0 },
    )
}

export class GananciasService {

    async getGananciasDia(idEmpleado?: number): Promise<GananciasResponse> {
        const raw = await prisma.$queryRaw<FilaRaw[]>`
            SELECT rango, total_ventas, total_ganancias FROM ganancias_dia(${idEmpleado ?? null}::INT)
        `
        const detalle = raw.map(normalizarFila)
        const { total_ventas, total_ganancias } = sumar(detalle)
        return { periodo: "dia", detalle, total_ventas, total_ganancias }
    }

    async getGananciasSemana(idEmpleado?: number): Promise<GananciasResponse> {
        const raw = await prisma.$queryRaw<FilaRaw[]>`
            SELECT dia, total_ventas, total_ganancias FROM ganancias_semana(${idEmpleado ?? null}::INT)
        `
        const detalle = raw.map(normalizarFila)
        const { total_ventas, total_ganancias } = sumar(detalle)
        return { periodo: "semana", detalle, total_ventas, total_ganancias }
    }

    async getGananciasMes(idEmpleado?: number): Promise<GananciasResponse> {
        const raw = await prisma.$queryRaw<FilaRaw[]>`
            SELECT semana, total_ventas, total_ganancias FROM ganancias_mes(${idEmpleado ?? null}::INT)
        `
        const detalle = raw.map(normalizarFila)
        const { total_ventas, total_ganancias } = sumar(detalle)
        return { periodo: "mes", detalle, total_ventas, total_ganancias }
    }

    async getGananciasAnio(idEmpleado?: number): Promise<GananciasResponse> {
        const raw = await prisma.$queryRaw<FilaRaw[]>`
            SELECT mes, total_ventas, total_ganancias FROM ganancias_anio(${idEmpleado ?? null}::INT)
        `
        const detalle = raw.map(normalizarFila)
        const { total_ventas, total_ganancias } = sumar(detalle)
        return { periodo: "anio", detalle, total_ventas, total_ganancias }
    }
}