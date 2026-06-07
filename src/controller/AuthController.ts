import type { Request, Response, NextFunction } from "express"
import { AuthService } from "../services/AuthService"
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
}
