export interface ProductoRequest{
    nombre: string
    descripcion: string
    precio_unitario: number
    stock: number
    id_proveedor: number
    id_categoria: number
    id_tipo: number
    fecha_vencimiento: Date
    detalles: string
}