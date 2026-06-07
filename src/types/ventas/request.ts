import { z } from "zod"

export const createVentaSchema = z.object({
    cliente: z.object({
        nombres: z.string().min(1, "El nombre es obligatorio"),
        apellidos: z.string().min(1, "Los apellidos son obligatorios"),
        dni: z.string().regex(/^\d{8}$/, "El DNI debe tener exactamente 8 dígitos"),
    }),
    productos: z.array(z.object({
        id_producto: z.number().int("El ID del producto debe ser un número entero").positive("El ID del producto debe ser un número positivo"),
        cantidad: z.number().int("La cantidad debe ser un número entero").positive("La cantidad debe ser un número positivo"),
    })).min(1, "Debe incluir al menos un producto"),
})

export const updateVentaSchema = createVentaSchema.partial()

export type CreateVentaRequest = z.infer<typeof createVentaSchema>
export type UpdateVentaRequest = z.infer<typeof updateVentaSchema>
