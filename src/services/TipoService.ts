import { prisma } from "../config/database"
import { TiposMedicamento } from "../entities/tipos-medicamento"
import type { TipoRequest } from "../types/tipo/request"
import type { TipoResponse } from "../types/tipo/response"

export class TipoService {
    async list(): Promise<TipoResponse[]> {
        const tipos = await prisma.tipos_medicamento.findMany()
        return tipos.map(TiposMedicamento.fromPrisma)
    }
}