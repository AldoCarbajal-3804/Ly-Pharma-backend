import { z } from "zod"
import { EnumTipo } from "../../generated/prisma/enums"

export const createTipoSchema = z.object({
    nombre: z.enum(EnumTipo, { error: "El tipo de medicamento no es válido" }),
    descripcion: z.string().nullable(),
})

export const updateTipoSchema = createTipoSchema.partial()

export type TipoRequest = z.infer<typeof createTipoSchema>
export type TipoUpdateRequest = z.infer<typeof updateTipoSchema>
