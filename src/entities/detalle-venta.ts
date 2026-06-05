import { detalle_venta as DetalleVentaPrisma } from "../generated/prisma/client";

export class DetalleVenta
{
    public readonly id_detalle            : number
    public readonly id_venta              : number
    public readonly id_producto           : string
    public readonly cantidad              : number
    public readonly precio_unitario_venta : number

    private constructor(
        id_detalle            : number,
        id_venta              : number,
        id_producto           : string,
        cantidad              : number,
        precio_unitario_venta : number,
    )
    {
        this.id_detalle            = id_detalle
        this.id_venta              = id_venta
        this.id_producto           = id_producto
        this.cantidad              = cantidad
        this.precio_unitario_venta = precio_unitario_venta
    }

    static fromPrisma(data: DetalleVentaPrisma): DetalleVenta
    {
        return new DetalleVenta(
            data.id_detalle,
            data.id_venta,
            data.id_producto.toString(),
            data.cantidad,
            Number(data.precio_unitario_venta),
        )
    }
}
