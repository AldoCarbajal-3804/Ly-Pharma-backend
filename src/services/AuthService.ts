import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "../config/database"
import { env } from "../config/env"
import { loginSchema } from "../utils/consults/login/request"
import type { LoginResponse } from "../utils/consults/login/response"

export class AuthService {

    async login(data: unknown): Promise<LoginResponse> {
        const { username, password } = loginSchema.parse(data)
        
        const usuario = await prisma.usuarios.findUnique({
            where: { username },
            include: { rol: true },
        })

        if (!usuario) {
            throw new Error("Credenciales inválidas")
        }

        const passwordValida = await bcrypt.compare(password, usuario.password_hash)
        if (!passwordValida) {
            throw new Error("Credenciales inválidas")
        }

        const payload = {
            id_usuario: usuario.id_usuario,
            id_empleado: usuario.id_empleado,
            username: usuario.username,
            id_rol: usuario.id_rol,
            nombre_rol: usuario.rol.nombre_rol,
        }

        const token = jwt.sign(payload as object, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN as string,
        } as jwt.SignOptions)

        await prisma.sesiones.updateMany({
            where: { id_usuario: usuario.id_usuario, activa: true },
            data: { fin: new Date(), activa: false },
        })

        const sesion = await prisma.sesiones.create({
            data: { id_usuario: usuario.id_usuario },
        })

        return {
            token,
            role: usuario.rol.nombre_rol,
            id_sesion: sesion.id_sesion,
        }
    }

    async logout(idUsuario: number): Promise<void> {
        await prisma.sesiones.updateMany({
            where: { id_usuario: idUsuario, activa: true },
            data: { fin: new Date(), activa: false },
        })
    }
}
