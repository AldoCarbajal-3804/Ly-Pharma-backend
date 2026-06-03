import { EnumCategoria } from "../../utils/enums/EnumCategoria"
import { EnumTipo } from "../../utils/enums/EnumTipo"

export interface ProductResponse{
    nombre: string
    precio: number
    categoria: EnumCategoria
    tipos: EnumTipo
    costo: number
    fechaVencimiento: Date
}