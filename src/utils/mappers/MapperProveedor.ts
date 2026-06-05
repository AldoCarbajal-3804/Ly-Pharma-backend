import { Proveedores } from "../../entities/proveedores"
import type { ProveedorResponse } from "../../types/proveedor/response"

export class MapperProveedor {
    static toResponse(proveedor: Proveedores): ProveedorResponse {
        return {
            nombre_empresa: proveedor.nombre_empresa           
        }
    }
}
