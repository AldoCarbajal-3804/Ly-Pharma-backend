import { prisma } from "../config/database"
import { TiposMedicamento } from "../entities/tipos-medicamento"
import { MapperTipo } from "../utils/mappers/MapperTipo"
import type { TipoResponse } from "../types/tipo/response"

export class TipoService {
    async list(): Promise<TipoResponse[]> {
        const tipos = await prisma.tipos_medicamento.findMany()
        return tipos.map(t => MapperTipo.toResponse(TiposMedicamento.fromPrisma(t)))
    }
}