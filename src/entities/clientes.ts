import { clientes as ClientesPrisma } from "@prisma/client";

export class Clientes
{
    public readonly id_cliente : number
    public readonly nombres    : string
    public readonly apellidos  : string
    public readonly dni        : string

    private constructor(
        id_cliente : number,
        nombres    : string,
        apellidos  : string,
        dni        : string,
    )
    {
        this.id_cliente = id_cliente
        this.nombres    = nombres
        this.apellidos  = apellidos
        this.dni        = dni
    }

    static fromPrisma(data: ClientesPrisma): Clientes
    {
        return new Clientes(
            data.id_cliente,
            data.nombres,
            data.apellidos,
            data.dni,
        )
    }
}
