export interface ProductoRequest{
    nombre: string
    descripcion: string
    precio_unitario: number
    stock: number
    proveedor: string
    categoria: string
    tipo: string
    fecha_vencimiento: Date
    detalles: string
}