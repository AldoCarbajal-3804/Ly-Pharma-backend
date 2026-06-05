import { prisma } from "../config/database"
import {Proveedores} from "../entities/proveedores"
import type {ProveedorRequest} from "../types/proveedor/request"
import type {ProveedorResponse} from "../types/proveedor/response"

export class ProveedorService {
    async list(): Promise<ProveedorResponse[]> {
        const proveedores = await prisma.proveedores.findMany()
        return proveedores.map(Proveedores.fromPrisma)
    }
}