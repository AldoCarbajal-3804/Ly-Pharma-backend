import { prisma } from "../config/database"
import { Proveedores } from "../entities/proveedores"
import { MapperProveedor } from "../utils/mappers/MapperProveedor"
import type { ProveedorResponse } from "../types/proveedor/response"
import type { proveedores } from "../generated/prisma/client"

export class ProveedorService {
    async list(): Promise<ProveedorResponse[]> {
        const proveedores = await prisma.proveedores.findMany()
        return proveedores.map((p: proveedores) => MapperProveedor.toResponse(Proveedores.fromPrisma(p)))
    }
}