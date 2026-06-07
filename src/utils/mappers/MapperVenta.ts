import type { VentaResponse, DetalleBoleta } from "../../types/ventas/response"

export class MapperVenta {

    static toResponse(venta: any): VentaResponse {
        const totalVenta = Number(venta.total_venta)
        const igv = Number(venta.igv)
        const subtotal = totalVenta - igv

        const productos: DetalleBoleta[] = (venta.detalles ?? []).map((d: any) => ({
            nombre: d.producto?.nombre_producto ?? `ID ${d.id_producto}`,
            cantidad: d.cantidad,
            precio_unitario: Number(d.precio_unitario_venta),
            importe: Number(d.precio_unitario_venta) * d.cantidad,
        }))

        return {
            id_venta: venta.id_venta,
            cliente: {
                nombres: venta.cliente?.nombres ?? "",
                apellidos: venta.cliente?.apellidos ?? "",
                dni: venta.cliente?.dni ?? "",
            },
            empleado: {
                nombres: venta.empleado?.nombres ?? "",
                apellidos: venta.empleado?.apellidos ?? "",
            },
            fecha: venta.fecha_venta,
            productos,
            subtotal,
            igv,
            total: totalVenta,
        }
    }
}
