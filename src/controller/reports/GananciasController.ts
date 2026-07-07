import type { Request, Response, NextFunction } from "express"
import { GananciasService } from "../../services/reports/GananciasService"

const service = new GananciasService()

export class GananciasController {

    static async dia(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre_rol, id_empleado } = res.locals.user
            const data = nombre_rol === "Admin"
                ? await service.getGananciasDia()
                : await service.getGananciasDia(id_empleado)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async semana(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre_rol, id_empleado } = res.locals.user
            const data = nombre_rol === "Admin"
                ? await service.getGananciasSemana()
                : await service.getGananciasSemana(id_empleado)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async mes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre_rol, id_empleado } = res.locals.user
            const data = nombre_rol === "Admin"
                ? await service.getGananciasMes()
                : await service.getGananciasMes(id_empleado)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    static async anio(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { nombre_rol, id_empleado } = res.locals.user
            const data = nombre_rol === "Admin"
                ? await service.getGananciasAnio()
                : await service.getGananciasAnio(id_empleado)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}