import { Categorias } from "../../entities/categorias"
import type { CategoriaResponse } from "../../types/categoria/response"

export class MapperCategoria {
    static toResponse(categoria: Categorias): CategoriaResponse {
        return {
            nombre: categoria.nombre
        }
    }
}
