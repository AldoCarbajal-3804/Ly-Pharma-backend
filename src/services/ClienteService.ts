import { prisma } from "../config/database"
import { Clientes } from "../entities/clientes"
import type { ClienteRequest } from "../types/clientes/request"
import type { ClienteResponse } from "../types/clientes/response"

export class ClienteService {
    async list(): Promise<ClienteResponse[]> {
        const clientes = await prisma.clientes.findMany()
        return clientes.map(Clientes.fromPrisma)
    }

    async create(data: ClienteRequest): Promise<ClienteResponse> {
        const created = await prisma.clientes.create({ data })
        return Clientes.fromPrisma(created)
    }
}
