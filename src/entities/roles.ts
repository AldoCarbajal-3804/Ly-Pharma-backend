import { roles as RolesPrisma } from "../generated/prisma/client";

export class Roles
{
    public readonly id_rol     : number
    public readonly nombre_rol : string

    private constructor(
        id_rol     : number,
        nombre_rol : string,
    )
    {
        this.id_rol     = id_rol
        this.nombre_rol = nombre_rol
    }

    static fromPrisma(data: RolesPrisma): Roles
    {
        return new Roles(
            data.id_rol,
            data.nombre_rol,
        )
    }
}
