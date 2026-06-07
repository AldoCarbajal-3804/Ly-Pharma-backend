import type { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

export function handleValidationError(err: Error, _req: Request, res: Response, next: NextFunction): void {
    if (err instanceof ZodError) {
        res.status(400).json({
            message: "Error de validación",
            errors: err.issues.map((e) => ({
                campo: String(e.path?.join(".") ?? ""),
                mensaje: e.message,
            })),
        })
        return
    }
    next(err)
}
