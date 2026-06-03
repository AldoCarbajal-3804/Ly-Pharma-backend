import { EnumCategoria } from "../../utils/enums/EnumCategoria"
import { EnumTipo } from "../../utils/enums/EnumTipo"

export interface ProductRequest{
    nombre: string
    precio: number
    descripcion: string
    categoria: EnumCategoria
    tipos: EnumTipo
    costo: number
    fechaVencimiento: Date
    detalles: string
}