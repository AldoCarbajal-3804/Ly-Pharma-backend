import { z } from "zod"

export const createClienteSchema = z.object({
    nombres: z.string().min(1, "El nombre es obligatorio"),
    apellidos: z.string().min(1, "Los apellidos son obligatorios"),
    dni: z.string().regex(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos"),
})

export const updateClienteSchema = createClienteSchema.partial()

export type ClienteRequest = z.infer<typeof createClienteSchema>
export type ClienteUpdateRequest = z.infer<typeof updateClienteSchema>
