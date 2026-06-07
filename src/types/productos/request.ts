import { z } from "zod"

export const createProductoSchema = z.object({
    nombre: z.string().min(1, "El nombre del producto es obligatorio"),
    descripcion: z.string(),
    precio_unitario: z.number().positive("El precio debe ser un número positivo"),
    stock: z.number().int("El stock debe ser un número entero").positive("El stock debe ser un número positivo"),
    proveedor: z.string().min(1, "El proveedor es obligatorio"),
    detalles: z.string(),
    tipo: z.string().min(1, "El tipo de medicamento es obligatorio"),
    categoria: z.string().min(1, "La categoría es obligatoria"),
    fecha_vencimiento: z.coerce.date({ error: "La fecha de vencimiento no es válida" }),
})

export const updateProductoSchema = createProductoSchema.partial()

export type ProductoRequest = z.infer<typeof createProductoSchema>
export type ProductoUpdateRequest = z.infer<typeof updateProductoSchema>
