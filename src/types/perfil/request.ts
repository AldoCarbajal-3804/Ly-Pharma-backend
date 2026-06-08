import { z } from "zod"

export const changePasswordSchema = z.object({
    current_password: z.string().min(1, "La contraseña actual es obligatoria"),
    new_password: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
})

export const changeEmailSchema = z.object({
    new_email: z.string().email("El correo electrónico no es válido"),
})

export const updatePerfilSchema = z.object({
    username: z.string().min(1, "El usuario es obligatorio").optional(),
    nombres: z.string().min(1, "El nombre es obligatorio").optional(),
    apellidos: z.string().min(1, "Los apellidos son obligatorios").optional(),
    telefono: z.string().nullable().optional(),
    direccion: z.string().nullable().optional(),
})

export const olvidePasswordSchema = z.object({
    username: z.string().min(1, "El usuario es obligatorio"),
})

export const restablecerPasswordSchema = z.object({
    token: z.string().min(1, "El token es obligatorio"),
    new_password: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
})

export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>
export type ChangeEmailRequest = z.infer<typeof changeEmailSchema>
export type UpdatePerfilRequest = z.infer<typeof updatePerfilSchema>
export type OlvidePasswordRequest = z.infer<typeof olvidePasswordSchema>
export type RestablecerPasswordRequest = z.infer<typeof restablecerPasswordSchema>
