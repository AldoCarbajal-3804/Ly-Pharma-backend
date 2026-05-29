import { tipos_medicamento as TiposMedicamentoPrisma } from "@prisma/client";

export class TiposMedicamento
{
    public readonly id_tipo     : number
    public readonly nombre      : string
    public readonly descripcion : string | null

    private constructor(
        id_tipo     : number,
        nombre      : string,
        descripcion : string | null,
    )
    {
        this.id_tipo     = id_tipo
        this.nombre      = nombre
        this.descripcion = descripcion
    }

    static fromPrisma(data: TiposMedicamentoPrisma): TiposMedicamento
    {
        return new TiposMedicamento(
            data.id_tipo,
            data.nombre,
            data.descripcion,
        )
    }
}
