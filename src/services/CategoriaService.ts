import { prisma } from "../config/database"
import { Categorias } from "../entities/categorias"
import type { CategoriaRequest } from "../types/categoria/request"
import type { CategoriaResponse } from "../types/categoria/response"

export class CategoriaService {
    async list(): Promise<CategoriaResponse[]> {
        const categorias = await prisma.categorias.findMany()
        return categorias.map(Categorias.fromPrisma)
    }
}