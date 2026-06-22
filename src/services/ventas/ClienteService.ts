import { prisma } from "../../config/database"
import { Clientes } from "../../entities/clientes"
import { createClienteSchema } from "../../types/clientes/request"
import type { ClienteResponse } from "../../types/clientes/response"


export class ClienteService {
    async list(): Promise<ClienteResponse[]> {
        const clientes = await prisma.clientes.findMany()
        return clientes.map(Clientes.fromPrisma)
    }

    async create(data: unknown): Promise<ClienteResponse> {
        const parsed = createClienteSchema.parse(data)
        const created = await prisma.clientes.create({ data: parsed })
        return Clientes.fromPrisma(created)
    }
}
