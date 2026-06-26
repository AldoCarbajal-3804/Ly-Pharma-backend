import type { Request, Response, NextFunction } from "express"
import { RankingService } from "../../services/reports/RankingService"

const service = new RankingService()

export class RankingController {

    static async index(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const limite = Number(req.query.limite) || 10
            const data = await service.getRanking(limite)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
}
