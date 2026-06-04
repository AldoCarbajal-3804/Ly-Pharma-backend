import { proveedores as ProveedoresPrisma } from "../generated/prisma/client";

export class Proveedores
{
    public readonly id_proveedor       : number
    public readonly nombre_empresa     : string
    public readonly direccion          : string | null
    public readonly telefono           : string | null
    public readonly correo_electronico : string | null
    public readonly detalles           : string | null

    private constructor(
        id_proveedor       : number,
        nombre_empresa     : string,
        direccion          : string | null,
        telefono           : string | null,
        correo_electronico : string | null,
        detalles           : string | null,
    )
    {
        this.id_proveedor       = id_proveedor
        this.nombre_empresa     = nombre_empresa
        this.direccion          = direccion
        this.telefono           = telefono
        this.correo_electronico = correo_electronico
        this.detalles           = detalles
    }

    static fromPrisma(data: ProveedoresPrisma): Proveedores
    {
        return new Proveedores(
            data.id_proveedor,
            data.nombre_empresa,
            data.direccion,
            data.telefono,
            data.correo_electronico,
            data.detalles,
        )
    }
}
