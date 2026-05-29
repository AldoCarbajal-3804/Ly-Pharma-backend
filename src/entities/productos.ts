import { productos as ProductosPrisma } from "@prisma/client";

export class Productos
{
    public readonly id_producto     : string
    public readonly nombre_producto : string
    public readonly descripcion     : string | null
    public readonly precio_unitario : number
    public readonly cantidad_stock  : number
    public readonly id_proveedor    : number
    public readonly detalles        : string | null
    public readonly id_tipo         : number

    private constructor(
        id_producto     : string,
        nombre_producto : string,
        descripcion     : string | null,
        precio_unitario : number,
        cantidad_stock  : number,
        id_proveedor    : number,
        detalles        : string | null,
        id_tipo         : number,
    )
    {
        this.id_producto     = id_producto
        this.nombre_producto = nombre_producto
        this.descripcion     = descripcion
        this.precio_unitario = precio_unitario
        this.cantidad_stock  = cantidad_stock
        this.id_proveedor    = id_proveedor
        this.detalles        = detalles
        this.id_tipo         = id_tipo
    }

    static fromPrisma(data: ProductosPrisma): Productos
    {
        return new Productos(
            data.id_producto,
            data.nombre_producto,
            data.descripcion,
            Number(data.precio_unitario),
            data.cantidad_stock,
            data.id_proveedor,
            data.detalles,
            data.id_tipo,
        )
    }
}
