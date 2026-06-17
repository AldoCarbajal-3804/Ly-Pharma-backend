import type { ResponseSessions } from "../../types/sesiones/response"

export class MapperSesion {

    static toResponse(sesion: any): ResponseSessions {
        const inicio = new Date(sesion.inicio)
        const fin = sesion.fin ? new Date(sesion.fin) : new Date()

        const diffMs = fin.getTime() - inicio.getTime()
        const minutos_trabajo = Math.max(0, Math.floor(diffMs / 60000))

        return {
            nombre: sesion.usuario?.empleado
                ? `${sesion.usuario.empleado.nombres} ${sesion.usuario.empleado.apellidos}`
                : "",
            fecha: inicio,
            hora_inicio: inicio,
            hora_final: sesion.fin ?? inicio,
            minutos_trabajo: minutos_trabajo as unknown as Date,
        }
    }
}
