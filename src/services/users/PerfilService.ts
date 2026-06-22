import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "../../config/database"
import { supabaseAdmin } from "../../config/supabase"
import { env } from "../../config/env"
import {
    changePasswordSchema,
    changeEmailSchema,
    updatePerfilSchema,
    olvidePasswordSchema,
    restablecerPasswordSchema,
} from "../../types/perfil/request"
import type { AuthPayload } from "../../middleware/authenticate"

export class PerfilService {

    async changePassword(user: AuthPayload, data: unknown): Promise<void> {
        const { current_password, new_password } = changePasswordSchema.parse(data)

        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: user.id_usuario },
        })

        if (!usuario) throw new Error("Usuario no encontrado")
        if (!usuario.auth_id) throw new Error("Cuenta no vinculada a Supabase Auth")

        const valida = await bcrypt.compare(current_password, usuario.password_hash)
        if (!valida) throw new Error("La contraseña actual no es correcta")

        const { error } = await supabaseAdmin.auth.admin.updateUserById(usuario.auth_id, {
            password: new_password,
        })
        if (error) throw new Error("Error al actualizar la contraseña en Supabase")

        const newHash = await bcrypt.hash(new_password, 10)
        await prisma.usuarios.update({
            where: { id_usuario: user.id_usuario },
            data: { password_hash: newHash },
        })
    }

    async changeEmail(user: AuthPayload, data: unknown): Promise<void> {
        const { new_email } = changeEmailSchema.parse(data)

        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: user.id_usuario },
        })
        if (!usuario?.auth_id) throw new Error("Cuenta no vinculada a Supabase Auth")

        const { error } = await supabaseAdmin.auth.admin.updateUserById(usuario.auth_id, {
            email: new_email,
        })
        if (error) throw new Error("Error al actualizar el correo electrónico")
    }

    async updateData(user: AuthPayload, data: unknown): Promise<void> {
        const parsed = updatePerfilSchema.parse(data)

        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: user.id_usuario },
        })
        if (!usuario) throw new Error("Usuario no encontrado")

        if (parsed.username !== undefined) {
            await prisma.usuarios.update({
                where: { id_usuario: user.id_usuario },
                data: { username: parsed.username },
            })
        }

        const empleadoData: Record<string, unknown> = {}
        if (parsed.nombres !== undefined) empleadoData.nombres = parsed.nombres
        if (parsed.apellidos !== undefined) empleadoData.apellidos = parsed.apellidos
        if (parsed.telefono !== undefined) empleadoData.telefono = parsed.telefono
        if (parsed.direccion !== undefined) empleadoData.direccion = parsed.direccion

        if (Object.keys(empleadoData).length > 0) {
            await prisma.empleados.update({
                where: { id_empleado: usuario.id_empleado },
                data: empleadoData,
            })
        }
    }

    async olvidePassword(data: unknown): Promise<{ token: string }> {
        const { username } = olvidePasswordSchema.parse(data)

        const usuario = await prisma.usuarios.findUnique({ where: { username } })
        if (!usuario) throw new Error("Usuario no encontrado")

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, purpose: "recovery" },
            env.JWT_SECRET,
            { expiresIn: "15m" },
        )

        await prisma.usuarios.update({
            where: { id_usuario: usuario.id_usuario },
            data: {
                recovery_token: token,
                recovery_expires: new Date(Date.now() + 15 * 60 * 1000),
            },
        })

        return { token }
    }

    async restablecerPassword(data: unknown): Promise<void> {
        const { token, new_password } = restablecerPasswordSchema.parse(data)

        let payload: { id_usuario: number; purpose: string }
        try {
            payload = jwt.verify(token, env.JWT_SECRET) as typeof payload
        } catch {
            throw new Error("Token inválido o expirado")
        }

        if (payload.purpose !== "recovery") throw new Error("Token inválido")

        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: payload.id_usuario },
        })
        if (!usuario) throw new Error("Usuario no encontrado")
        if (usuario.recovery_token !== token) throw new Error("Token ya utilizado")
        if (!usuario.recovery_expires || usuario.recovery_expires < new Date()) {
            throw new Error("Token expirado")
        }

        if (usuario.auth_id) {
            const { error } = await supabaseAdmin.auth.admin.updateUserById(usuario.auth_id, {
                password: new_password,
            })
            if (error) throw new Error("Error al restablecer la contraseña")
        }

        const newHash = await bcrypt.hash(new_password, 10)
        await prisma.usuarios.update({
            where: { id_usuario: usuario.id_usuario },
            data: { password_hash: newHash, recovery_token: null, recovery_expires: null },
        })
    }

    async getProfile(user: AuthPayload): Promise<{
        username: string
        nombres: string
        apellidos: string
        email: string | null
        telefono: string | null
        direccion: string | null
    }> {
        const usuario = await prisma.usuarios.findUnique({
            where: { id_usuario: user.id_usuario },
            include: { empleado: true },
        })
        if (!usuario) throw new Error("Usuario no encontrado")

        return {
            username: usuario.username,
            nombres: usuario.empleado.nombres,
            apellidos: usuario.empleado.apellidos,
            email: usuario.empleado.email,
            telefono: usuario.empleado.telefono,
            direccion: usuario.empleado.direccion,
        }
    }
}
