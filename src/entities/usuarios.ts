import { usuarios as UsuariosPrisma } from "../generated/prisma/client";

export class Usuarios
{
    public readonly id_usuario    : number
    public readonly id_empleado   : number
    public readonly username      : string
    public readonly password_hash : string
    public readonly id_rol        : number
    public readonly auth_id       : string | null

    private constructor(
        id_usuario    : number,
        id_empleado   : number,
        username      : string,
        password_hash : string,
        id_rol        : number,
        auth_id       : string | null,
    )
    {
        this.id_usuario    = id_usuario
        this.id_empleado   = id_empleado
        this.username      = username
        this.password_hash = password_hash
        this.id_rol        = id_rol
        this.auth_id       = auth_id
    }

    static fromPrisma(data: UsuariosPrisma): Usuarios
    {
        return new Usuarios(
            data.id_usuario,
            data.id_empleado,
            data.username,
            data.password_hash,
            data.id_rol,
            data.auth_id,
        )
    }
}
