import { z } from "zod"
import { EnumCategoria } from "../../generated/prisma/enums"

export const createCategoriaSchema = z.object({
    nombre: z.enum(EnumCategoria, { error: "La categoría no es válida" }),
    descripcion: z.string().nullable(),
})

export const updateCategoriaSchema = createCategoriaSchema.partial()

export type CategoriaRequest = z.infer<typeof createCategoriaSchema>
export type CategoriaUpdateRequest = z.infer<typeof updateCategoriaSchema>
