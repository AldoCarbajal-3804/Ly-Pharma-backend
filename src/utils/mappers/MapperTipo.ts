import { TiposMedicamento } from "../../entities/tipos-medicamento"
import type { TipoResponse } from "../../types/tipo/response"

export class MapperTipo {
    static toResponse(tipo: TiposMedicamento): TipoResponse {
        return {
            nombre: tipo.nombre,
        }
    }
}
