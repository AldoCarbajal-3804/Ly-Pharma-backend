import type { Request, Response, NextFunction } from "express"
import { AuthService } from "../../services/users/AuthService"
import { ZodError } from "zod"

const service = new AuthService()

export class AuthController {

    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await service.login(req.body)
            res.json(result)
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            const status = message === "Credenciales inválidas" ? 401 : 500
            res.status(status).json({ message })
        }
    }

    static async logout(_req: Request, res: Response): Promise<void> {
        try {
            await service.logout(res.locals.user.id_usuario)
            res.json({ message: "Sesión cerrada exitosamente" })
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            res.status(500).json({ message })
        }
    }
}
