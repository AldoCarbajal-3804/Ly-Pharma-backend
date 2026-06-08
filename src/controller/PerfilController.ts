import type { Request, Response, NextFunction } from "express"
import { PerfilService } from "../services/PerfilService"
import { ZodError } from "zod"

const service = new PerfilService()

export class PerfilController {

    static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profile = await service.getProfile(res.locals.user)
            res.json(profile)
        } catch (error) {
            next(error)
        }
    }

    static async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await service.changePassword(res.locals.user, req.body)
            res.json({ message: "Contraseña actualizada correctamente" })
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            const message = error instanceof Error ? error.message : "Error interno"
            const status = message.includes("no es correcta") || message.includes("no encontrado") ? 400 : 500
            res.status(status).json({ message })
        }
    }

    static async changeEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await service.changeEmail(res.locals.user, req.body)
            res.json({ message: "Correo electrónico actualizado correctamente" })
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            const message = error instanceof Error ? error.message : "Error interno"
            const status = message.includes("no vinculada") ? 400 : 500
            res.status(status).json({ message })
        }
    }

    static async updateData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await service.updateData(res.locals.user, req.body)
            res.json({ message: "Datos actualizados correctamente" })
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            next(error)
        }
    }

    static async olvidePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await service.olvidePassword(req.body)
            res.json(result)
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            const message = error instanceof Error ? error.message : "Error interno"
            const status = message === "Usuario no encontrado" ? 404 : 500
            res.status(status).json({ message })
        }
    }

    static async restablecerPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await service.restablecerPassword(req.body)
            res.json({ message: "Contraseña restablecida correctamente" })
        } catch (error) {
            if (error instanceof ZodError) { next(error); return }
            const message = error instanceof Error ? error.message : "Error interno"
            const status = message.includes("expirado") || message.includes("inválido") || message.includes("utilizado") || message === "Usuario no encontrado" ? 400 : 500
            res.status(status).json({ message })
        }
    }
}
