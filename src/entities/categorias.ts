import { categorias as CategoriasPrisma, EnumCategoria } from "../generated/prisma/client";

export class Categorias
{
    public readonly id_categoria : number
    public readonly nombre       : EnumCategoria
    public readonly descripcion  : string | null

    private constructor(
        id_categoria : number,
        nombre       : EnumCategoria,
        descripcion  : string | null,
    )
    {
        this.id_categoria = id_categoria
        this.nombre       = nombre
        this.descripcion  = descripcion
    }

    static fromPrisma(data: CategoriasPrisma): Categorias {
        return new Categorias(
            data.id_categoria,
            data.nombre,
            data.descripcion,
        )
    }
}
