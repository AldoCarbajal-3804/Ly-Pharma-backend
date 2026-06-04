import { tipos_medicamento as TiposMedicamentoPrisma, EnumTipo } from "../generated/prisma/client";

export class TiposMedicamento
{
    public readonly id_tipo     : number
    public readonly nombre      : EnumTipo
    public readonly descripcion : string | null

    private constructor(
        id_tipo     : number,
        nombre      : EnumTipo,
        descripcion : string | null,
    )
    {
        this.id_tipo     = id_tipo
        this.nombre      = nombre
        this.descripcion = descripcion
    }

    static fromPrisma(data: TiposMedicamentoPrisma): TiposMedicamento {
        return new TiposMedicamento(
            data.id_tipo,
            data.nombre,
            data.descripcion,
        )
    }
}
