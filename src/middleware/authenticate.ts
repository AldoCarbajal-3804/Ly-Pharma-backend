import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { env } from "../config/env"

export interface AuthPayload {
    id_usuario: number
    id_empleado: number
    username: string
    id_rol: number
    nombre_rol: string
}

declare global {
    namespace Express {
        interface Locals {
            user: AuthPayload
        }
    }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const header = req.headers.authorization

    if (!header || !header.startsWith("Bearer ")) {
        res.status(401).json({ message: "Token no proporcionado" })
        return
    }

    const token = header.split(" ")[1]

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload
        res.locals.user = decoded
        next()
    } catch {
        res.status(401).json({ message: "Token inválido o expirado" })
    }
}
