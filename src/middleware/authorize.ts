import type { Request, Response, NextFunction } from "express"

export function authorize(...allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = res.locals.user

        if (!user) {
            res.status(401).json({ message: "No autenticado" })
            return
        }

        if (!allowedRoles.includes(user.nombre_rol)) {
            res.status(403).json({ message: "No tienes permisos para acceder a este recurso" })
            return
        }

        next()
    }
}
