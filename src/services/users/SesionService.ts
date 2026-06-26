import { prisma } from "../../config/database"
import type { ResponseSessions } from "../../types/sesiones/response"
import { MapperSesion } from "../../utils/mappers/MapperSesion"

export class SesionService {

    async listRecent(id_usuario?: number): Promise<ResponseSessions[]> {
        const where = id_usuario !== undefined ? { id_usuario } : {}

        const sesiones = await prisma.sesiones.findMany({
            where,
            include: {
                usuario: {
                    include: { empleado: true },
                },
            },
            orderBy: { inicio: "desc" },
            take: 20,
        })

        return sesiones.map(MapperSesion.toResponse)
    }
}
