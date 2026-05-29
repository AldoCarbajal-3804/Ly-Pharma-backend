import { empleados as EmpleadosPrisma } from "@prisma/client";

export class Empleados
{
    public readonly id_empleado : number
    public readonly nombres     : string
    public readonly apellidos   : string
    public readonly direccion   : string | null
    public readonly telefono    : string | null
    public readonly email       : string | null

    private constructor(
        id_empleado : number,
        nombres     : string,
        apellidos   : string,
        direccion   : string | null,
        telefono    : string | null,
        email       : string | null,
    )
    {
        this.id_empleado = id_empleado
        this.nombres     = nombres
        this.apellidos   = apellidos
        this.direccion   = direccion
        this.telefono    = telefono
        this.email       = email
    }

    static fromPrisma(data: EmpleadosPrisma): Empleados
    {
        return new Empleados(
            data.id_empleado,
            data.nombres,
            data.apellidos,
            data.direccion,
            data.telefono,
            data.email,
        )
    }
}
