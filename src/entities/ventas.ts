import { ventas as VentasPrisma } from "@prisma/client";

export class Ventas
{
    public readonly id_venta     : number
    public readonly id_cliente   : number
    public readonly id_empleado  : number
    public readonly fecha_venta  : Date
    public readonly total_venta  : number

    private constructor(
        id_venta     : number,
        id_cliente   : number,
        id_empleado  : number,
        fecha_venta  : Date,
        total_venta  : number,
    )
    {
        this.id_venta     = id_venta
        this.id_cliente   = id_cliente
        this.id_empleado  = id_empleado
        this.fecha_venta  = fecha_venta
        this.total_venta  = total_venta
    }

    static fromPrisma(data: VentasPrisma): Ventas
    {
        return new Ventas(
            data.id_venta,
            data.id_cliente,
            data.id_empleado,
            data.fecha_venta,
            Number(data.total_venta),
        )
    }
}
