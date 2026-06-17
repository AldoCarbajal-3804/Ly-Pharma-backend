import { sesiones as SesionesPrisma } from "../generated/prisma/client"

export class Sesiones {
    public readonly id_sesion: number
    public readonly id_usuario: number
    public readonly inicio: Date
    public readonly fin: Date | null
    public readonly activa: boolean

    private constructor(
        id_sesion: number,
        id_usuario: number,
        inicio: Date,
        fin: Date | null,
        activa: boolean,
    ) {
        this.id_sesion = id_sesion
        this.id_usuario = id_usuario
        this.inicio = inicio
        this.fin = fin
        this.activa = activa
    }

    static fromPrisma(data: SesionesPrisma): Sesiones {
        return new Sesiones(
            data.id_sesion,
            data.id_usuario,
            data.inicio,
            data.fin,
            data.activa,
        )
    }
}
