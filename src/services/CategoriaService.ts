import { prisma } from "../config/database"
import { Categorias } from "../entities/categorias"
import { MapperCategoria } from "../utils/mappers/MapperCategoria"
import type { CategoriaResponse } from "../types/categoria/response"

export class CategoriaService {
    async list(): Promise<CategoriaResponse[]> {
        const categorias = await prisma.categorias.findMany()
        return categorias.map(c => MapperCategoria.toResponse(Categorias.fromPrisma(c)))
    }
}