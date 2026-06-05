export interface ProductoResponse{
    id_producto: number
    nombre: string
    stock: number
    precio_unitario: number
    categoria: string
    tipo: string
    proveedor: string
    fecha_vencimiento: Date
}