import type { Request, Response } from 'express';
import { CategoriaService } from '../../services/products/CategoriaService';

const service = new CategoriaService();

export class CategoriaController {
    static async list(_req: Request, res: Response): Promise<void> {
        const categorias = await service.list();
        res.json(categorias);
    }
}