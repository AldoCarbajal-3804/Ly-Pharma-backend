import { prisma } from "../../config/database"
import { TiposMedicamento } from "../../entities/tipos-medicamento"
import { MapperTipo } from "../../utils/mappers/MapperTipo"
import type { TipoResponse } from "../../types/tipo/response"
import type { tipos_medicamento } from "../../generated/prisma/client"

export class TipoService {
    async list(): Promise<TipoResponse[]> {
        const tipos = await prisma.tipos_medicamento.findMany()
        return tipos.map((t: tipos_medicamento) => MapperTipo.toResponse(TiposMedicamento.fromPrisma(t)))
    }
}