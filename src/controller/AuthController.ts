import type { Request, Response } from "express"
import { AuthService } from "../services/AuthService"
import type { LoginRequest } from "../utils/consults/login/request"

const service = new AuthService()

export class AuthController {

    static async login(req: Request, res: Response): Promise<void> {
        try {
            const data: LoginRequest = req.body

            if (!data.username || !data.password) {
                res.status(400).json({ message: "Username y password son requeridos" })
                return
            }

            const result = await service.login(data)
            res.json(result)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error interno del servidor"
            const status = message === "Credenciales inválidas" ? 401 : 500
            res.status(status).json({ message })
        }
    }
}
