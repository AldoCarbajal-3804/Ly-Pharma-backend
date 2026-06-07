import { z } from "zod"

export const createProveedorSchema = z.object({
    nombre_empresa: z.string().min(1, "El nombre de la empresa es obligatorio"),
    direccion: z.string().nullable(),
    telefono: z.string().nullable(),
    correo_electronico: z.email().nullable(),
    detalles: z.string().nullable(),
})

export const updateProveedorSchema = createProveedorSchema.partial()

export type ProveedorRequest = z.infer<typeof createProveedorSchema>
export type ProveedorUpdateRequest = z.infer<typeof updateProveedorSchema>
